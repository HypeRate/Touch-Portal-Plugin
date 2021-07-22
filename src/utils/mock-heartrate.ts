// @ts-ignore
import TouchPortalAPI from "touchportal-api";

function getRandomHeartrate() {
  return Math.floor(Math.random() * 20 + 38);
}

function sendHeartrate(client: typeof TouchPortalAPI.Client) {
  let heartRate = getRandomHeartrate();
  client.stateUpdate("hyperate_current_heartrate", heartRate);
}

export function sendMockHeartrate(
  client: typeof TouchPortalAPI.Client,
  interval: number = 3000
) {
  setInterval(() => sendHeartrate(client), interval);
}
