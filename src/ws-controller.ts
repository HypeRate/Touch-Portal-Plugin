// @ts-ignore
import { TPController } from "./tp-controller";
import WebSocket from "ws";
import { State } from "./constants/states";

export class WSController {
  private tpService: TPController;
  private wss: WebSocket;

  constructor(wss: WebSocket, tpService: TPController) {
    this.wss = wss;
    this.tpService = tpService;
  }

  /**
   * Conntects to the Hyperate WebSocket
   * @param hypeRateUserId HypeRate User ID
   */
  join(hypeRateUserId: string): void {
    const payload = {
      topic: `hr:${hypeRateUserId}`,
      event: "phx_join",
      payload: {},
      ref: 0,
    };

    this.wss.send(JSON.stringify(payload));
  }

  /**
   * Sends a heartbeat to the Hyperate WebSocket
   * to keep connection alive
   */
  sendHeartbeat(): void {
    const payload = {
      topic: "phoenix",
      event: "heartbeat",
      payload: {},
      ref: 0,
    };
    setInterval(() => {
      this.wss.send(JSON.stringify(payload));
    }, 25000);
  }

  /**
   * Callback for when a message is received from the Hyperate WebSocket
   * @param payload Payload received from the Hyperate WebSocket
   */
  onMessage(payload: any): void {
    const message = JSON.parse(payload);

    switch (message.event) {
      case "hr_update":
        const heartRate = message.payload.hr;
        this.tpService.updateState(State.CURRENT_HEARTRATE, heartRate);
        break;
      default:
        console.log("Message type does not exist");
    }
  }
}
