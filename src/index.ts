// @ts-ignore
import dotenv from "dotenv";
import WebSocket from "ws";
import { Setting } from "./constants/settings";
import { TPController } from "./tp-controller";
import { WSController } from "./ws-controller";

dotenv.config();

(async () => {
  const HYPERATE_WEBSOCKET_URL = `wss://app.hyperate.io/socket/websocket?token=${process.env.HYPERATE_API_KEY}`;
  const TOUCHPORTAL_PLUGIN_ID = 'markusbink.TouchPortalHypeRatePlugin';

  const tpService = new TPController(TOUCHPORTAL_PLUGIN_ID);

  console.log('[HypeRate] Connecting to Hyperate WebSocket...');

  const wss = new WebSocket(HYPERATE_WEBSOCKET_URL);
  const wsController = new WSController(wss, tpService);

  const hypeRateUserId = await tpService.getSettingByKey(Setting.HYPERATE_ID);

  if (wss) {
    wss.on('open', () => {
      console.log('[HypeRate] Connected to Hyperate WebSocket');
      wsController.join(hypeRateUserId);
    });
    wsController.sendHeartbeat();
    wss.on("message", (payload) => wsController.onMessage(payload));
  }
})();
