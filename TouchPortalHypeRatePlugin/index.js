"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var touchportal_api_1 = __importDefault(require("touchportal-api"));
var ws_1 = __importDefault(require("ws"));
// Websocket URL for HypeRate
var WEBSOCKET_URL = "wss://app.hyperate.io/socket/websocket";
// Define a pluginId, matches your entry.tp file
var PLUGIN_ID = "markusbink.TouchPortalHypeRatePlugin";
// let hypeRateUserId;
// Create an instance of the Touch Portal Client
var TPClient = new touchportal_api_1.default.Client();
//Connects and Pairs to Touch Portal via Sockete
TPClient.connect({ pluginId: PLUGIN_ID });
// After joining Touch Portal, it sends an info message
TPClient.on("Info", function (data) {
    console.log("Info: " + JSON.stringify(data, null, 2));
});
TPClient.on("Action", function (data, _hold) {
    var actionName = data.actionId;
    console.dir("Action: " + JSON.stringify(actionName));
    // Value can be read from within Touch Portal
    TPClient.stateUpdate("hyperate_current_heartrate", "value", 90);
});
var hypeRateUserId = "6371";
var payload = {
    topic: "hr:" + hypeRateUserId,
    event: "phx_join",
    payload: {},
    ref: 0,
};
var wss = new ws_1.default(WEBSOCKET_URL);
// function getRandomHeartrate() {
//   const minHeartrate = 70;
//   return Math.floor(Math.random() * 20 + minHeartrate);
// }
// function setHeartrate() {
//   let currentHeartRate = getRandomHeartrate();
//   TPClient.stateUpdate("hyperate_current_heartrate", "value", currentHeartRate);
// }
if (wss) {
    console.log("Connected to " + WEBSOCKET_URL);
    wss.on("open", function () {
        wss.send(JSON.stringify(payload), function () {
            console.log("\nSent message with payload " + JSON.stringify(payload, null, 2));
        });
    });
    wss.on("message", function (payload) {
        var message = JSON.parse(payload);
        switch (message.event) {
            case "hr_update":
                var newHeartrate = message.payload.hr;
                console.log({ newHeartrate: newHeartrate });
                TPClient.stateUpdate("hyperate_current_heartrate", "value", newHeartrate);
                break;
            default:
                console.log("Unhandled message: " + JSON.stringify(message, null, 2));
        }
        // TODO: Read hyperRateId from TouchPortal
        // TODO: Setup Settings value where users can insert their HypeRate ID within TouchPortal
        // TODO: Figure out how to build an executable from this node script
    });
}
