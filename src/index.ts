// @ts-ignore
import TouchPortalAPI from "touchportal-api";
import WebSocket from "ws";

// Websocket URL for HypeRate
const WEBSOCKET_URL = "wss://app.hyperate.io/socket/websocket";
// Define a pluginId, matches your entry.tp file
const PLUGIN_ID = "markusbink.TouchPortalHypeRatePlugin";

let hypeRateUserId;

// Create an instance of the Touch Portal Client
const TPClient = new TouchPortalAPI.Client();

//Connects and Pairs to Touch Portal via Sockete
TPClient.connect({ pluginId: PLUGIN_ID });

// After joining Touch Portal, it sends an info message
TPClient.on("Info", (data: any) => {
  console.log(`Info: ${JSON.stringify(data, null, 2)}`);
});

TPClient.on("Action", (data: any, _hold: any) => {
  const actionName = data.actionId;
  console.dir(`Action: ${JSON.stringify(actionName)}`);
  // Value can be read from within Touch Portal
  hypeRateUserId = "6371";
  TPClient.stateUpdate("hyperate_current_heartrate", "value", 40);
});

const payload = {
  topic: `hr:${hypeRateUserId}`,
  event: "phx_join",
  payload: {},
  ref: 0,
};
const wss = new WebSocket(WEBSOCKET_URL);

if (wss) {
  console.log(`Connected to ${WEBSOCKET_URL}`);

  wss.on("open", () => {
    wss.send(JSON.stringify(payload), () => {
      console.log(
        `\nSent message with payload ${JSON.stringify(payload, null, 2)}`
      );
    });
  });

  wss.on("message", (payload: any) => {
    const message = JSON.parse(payload);
    console.log(
      `\nGot message with payload ${JSON.stringify(message, null, 2)}`
    );
    // TODO: Mock heartrate response with setInterval
    // TODO: Setup Settings value where users can insert their HypeRate ID within TouchPortal
    // TODO: Read hyperRateId from TouchPortal
    // TODO: Figure out how to build an executable from this node script
  });
}
