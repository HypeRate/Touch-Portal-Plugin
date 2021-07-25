// @ts-ignore
import WebSocket from "ws";
import { Setting } from "./constants/settings";
import { TPController } from "./tp-controller";
import { sendMockHeartrate } from "./utils/mock-heartrate";
import { WSController } from "./ws-controller";

const HYPERATE_WEBSOCKET_URL = "wss://app.hyperate.io/socket/websocket";
const TOUCHPORTAL_PLUGIN_ID = "markusbink.TouchPortalHypeRatePlugin";

const tpService = new TPController(TOUCHPORTAL_PLUGIN_ID);
const wss = new WebSocket(HYPERATE_WEBSOCKET_URL);
const wsController = new WSController(wss, tpService);

const hypeRateUserId = tpService.getSettingByKey(Setting.HYPERATE_ID);

wss.on("open", () => wsController.join(hypeRateUserId));
wss.on("message", (payload) => wsController.onMessage(payload));
sendMockHeartrate(tpService.client, 3000);
