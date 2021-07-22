// @ts-ignore
import { TPController } from "./tp-controller";
import WebSocket from "ws";

export class WSController {
  private tpService: TPController;
  private wss: WebSocket;

  constructor(wss: WebSocket, tpService: TPController) {
    this.wss = wss;
    this.tpService = tpService;
  }

  join(hypeRateUserId: number | string) {
    const payload = {
      topic: `hr:${hypeRateUserId}`,
      event: "phx_join",
      payload: {},
      ref: 0,
    };
    this.wss.send(JSON.stringify(payload));
  }

  onMessage(payload: any) {
    const message = JSON.parse(payload);

    switch (message.event) {
      case "phx_reply":
        this.tpService.updateState("hyperate_current_heartrate", 80);
        break;
      default:
        throw new Error("Message type does not exist");
    }
  }
}
