// @ts-ignore
import WebSocket from "ws";
import { Setting } from "./constants/settings";
import { TPController } from "./tp-controller";
import { WSController } from "./ws-controller";

const HYPERATE_WEBSOCKET_URL = "wss://app.hyperate.io/socket/websocket";
const TOUCHPORTAL_PLUGIN_ID = "markusbink.TouchPortalHypeRatePlugin";

const tpService = new TPController(TOUCHPORTAL_PLUGIN_ID);
const wss = new WebSocket(HYPERATE_WEBSOCKET_URL);
const wsController = new WSController(wss, tpService);

(async () => {
  const hypeRateUserId = await tpService.getSettingByKey(Setting.HYPERATE_ID);

  if (wss) {
    wss.on("open", () => wsController.join(hypeRateUserId));
    wsController.sendHeartbeat();
    wss.on("message", (payload) => wsController.onMessage(payload));
  }
})();
