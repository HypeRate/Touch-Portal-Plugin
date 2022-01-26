// @ts-ignore
import TouchPortalAPI from "touchportal-api";
import { State } from "../constants/states";

/**
 * Generate a random heartrate
 * @returns A random heartrate
 */
function getRandomHeartrate() {
  return Math.floor(Math.random() * 20 + 38);
}

/**
 * Sends a heartbeat to the TouchPortal client
 * @param client TouchPortal API Client
 */
function sendHeartrate(client: typeof TouchPortalAPI.Client) {
  let heartRate = getRandomHeartrate();
  client.stateUpdate(State.CURRENT_HEARTRATE, heartRate);
}

/**
 * Used to mock a response with a random heartrate
 * @param client TouchPortal API Client
 * @param interval Interval in milliseconds
 */
export function sendMockHeartrate(
  client: typeof TouchPortalAPI.Client,
  interval: number = 3000
) {
  setInterval(() => sendHeartrate(client), interval);
}
