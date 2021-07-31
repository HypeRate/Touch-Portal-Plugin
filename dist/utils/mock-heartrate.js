"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMockHeartrate = void 0;
var states_1 = require("../constants/states");
function getRandomHeartrate() {
    return Math.floor(Math.random() * 20 + 38);
}
function sendHeartrate(client) {
    var heartRate = getRandomHeartrate();
    console.log("Heartrate: " + heartRate);
    client.stateUpdate(states_1.State.CURRENT_HEARTRATE, heartRate);
}
function sendMockHeartrate(client, interval) {
    if (interval === void 0) { interval = 3000; }
    setInterval(function () { return sendHeartrate(client); }, interval);
}
exports.sendMockHeartrate = sendMockHeartrate;
