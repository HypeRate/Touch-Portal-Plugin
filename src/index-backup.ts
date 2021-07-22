// @ts-ignore
import TouchPortalAPI from "touchportal-api";
import WebSocket from "ws";
import { sendMockHeartrate } from "./utils/mock-heartrate";

const HYPERATE_WEBSOCKET_URL = "wss://app.hyperate.io/socket/websocket";
const TOUCHPORTAL_PLUGIN_ID = "markusbink.TouchPortalHypeRatePlugin";

const TPClient = new TouchPortalAPI.Client();
let hypeRateUserId: number;

TPClient.connect({ pluginId: TOUCHPORTAL_PLUGIN_ID });

TPClient.on("Info", (data: any) => {
  // Get HypeRateId from TouchPortal Plugin Settings
  hypeRateUserId = data.settings[0]["HypeRate ID"];
  console.log("Joined TouchPortal");
});

sendMockHeartrate(TPClient, 3000);

const wss = new WebSocket(HYPERATE_WEBSOCKET_URL);

wss.on("open", () => {
  console.log(`Connected to ${HYPERATE_WEBSOCKET_URL}`);
  const payload = {
    topic: `hr:${hypeRateUserId}`,
    event: "phx_join",
    payload: {},
    ref: 0,
  };
  wss.send(JSON.stringify(payload));
});

wss.on("error", (err) => {
  console.log(err);
});

wss.on("message", (payload: any) => {
  const message = JSON.parse(payload);
  console.log({ message });
});

// TODO: Figure out how to build an executable from this node script
