"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var touchportal_api_1 = __importDefault(require("touchportal-api"));
var ws_1 = __importDefault(require("ws"));
var mock_heartrate_1 = require("./utils/mock-heartrate");
var HYPERATE_WEBSOCKET_URL = "wss://app.hyperate.io/socket/websocket";
var TOUCHPORTAL_PLUGIN_ID = "markusbink.TouchPortalHypeRatePlugin";
var TPClient = new touchportal_api_1.default.Client();
var hypeRateUserId;
TPClient.connect({ pluginId: TOUCHPORTAL_PLUGIN_ID });
TPClient.on("Info", function (data) {
    // Get HypeRateId from TouchPortal Plugin Settings
    hypeRateUserId = data.settings[0]["HypeRate ID"];
    console.log("Joined TouchPortal");
});
mock_heartrate_1.sendMockHeartrate(TPClient, 3000);
var wss = new ws_1.default(HYPERATE_WEBSOCKET_URL);
wss.on("open", function () {
    console.log("Connected to " + HYPERATE_WEBSOCKET_URL);
    var payload = {
        topic: "hr:" + hypeRateUserId,
        event: "phx_join",
        payload: {},
        ref: 0,
    };
    wss.send(JSON.stringify(payload));
});
wss.on("error", function (err) {
    console.log(err);
});
wss.on("message", function (payload) {
    var message = JSON.parse(payload);
    console.log({ message: message });
});
// TODO: Figure out how to build an executable from this node script
