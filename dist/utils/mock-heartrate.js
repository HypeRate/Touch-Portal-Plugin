"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMockHeartrate = void 0;
var states_1 = require("../constants/states");
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
function sendHeartrate(client) {
    var heartRate = getRandomHeartrate();
    client.stateUpdate(states_1.State.CURRENT_HEARTRATE, heartRate);
}
/**
 * Used to mock a response with a random heartrate
 * @param client TouchPortal API Client
 * @param interval Interval in milliseconds
 */
function sendMockHeartrate(client, interval) {
    if (interval === void 0) { interval = 3000; }
    setInterval(function () { return sendHeartrate(client); }, interval);
}
exports.sendMockHeartrate = sendMockHeartrate;
