"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var touchportal_api_1 = __importDefault(require("touchportal-api"));
var ws_1 = __importDefault(require("ws"));
var WEBSOCKET_URL = "wss://app.hyperate.io/socket/websocket";
var payload = {
    topic: "hr:6371",
    event: "phx_join",
    payload: {},
    ref: 0,
};
var wss = new ws_1.default(WEBSOCKET_URL);
if (wss) {
    console.log("Connected to " + WEBSOCKET_URL);
    wss.on("open", function () {
        wss.send(JSON.stringify(payload), function () {
            console.log("\nSent message with payload " + JSON.stringify(payload, null, 2));
        });
    });
    wss.on("message", function (payload) {
        var message = JSON.parse(payload);
        console.log("\nGot message with payload " + JSON.stringify(message, null, 2));
    });
}
// Create an instance of the Touch Portal Client
var TPClient = new touchportal_api_1.default.Client();
// Define a pluginId, matches your entry.tp file
var PLUGIN_ID = "markusbink.TouchPortalHypeRatePlugin";
//Connects and Pairs to Touch Portal via Sockete
TPClient.connect({ pluginId: PLUGIN_ID });
// After join to Touch Portal, it sends an info message
TPClient.on("Info", function (data) {
    console.log("Info: " + JSON.stringify(data, null, 2));
});
TPClient.on("Action", function (data, _hold) {
    var actionName = data.actionId;
    console.dir("Action: " + JSON.stringify(actionName));
    // Value can be read from within Touch Portal
    TPClient.stateUpdate("hyperate_current_heartrate", "value", 40);
});
