// @ts-ignore
import WebSocket from "ws";
import { TPController } from "./tp-controller";
import { WSController } from "./ws-controller";

const HYPERATE_WEBSOCKET_URL = "wss://app.hyperate.io/socket/websocket";
const TOUCHPORTAL_PLUGIN_ID = "markusbink.TouchPortalHypeRatePlugin";

const tpService = new TPController(TOUCHPORTAL_PLUGIN_ID);
const wss = new WebSocket(HYPERATE_WEBSOCKET_URL);
const wsController = new WSController(wss, tpService);

const hypeRateUserId = tpService.getSettingByKey("HypeRate ID");

wss.on("open", () => wsController.join(hypeRateUserId));
wss.on("message", (payload) => wsController.onMessage(payload));
// TODO: Figure out how to build an executable from this node script
