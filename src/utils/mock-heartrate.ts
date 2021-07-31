// @ts-ignore
import TouchPortalAPI from "touchportal-api";
import { State } from "../constants/states";

function getRandomHeartrate() {
  return Math.floor(Math.random() * 20 + 38);
}

function sendHeartrate(client: typeof TouchPortalAPI.Client) {
  let heartRate = getRandomHeartrate();
  client.stateUpdate(State.CURRENT_HEARTRATE, heartRate);
}

export function sendMockHeartrate(
  client: typeof TouchPortalAPI.Client,
  interval: number = 3000
) {
  setInterval(() => sendHeartrate(client), interval);
}
