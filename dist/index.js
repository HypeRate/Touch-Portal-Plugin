"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var ws_1 = __importDefault(require("ws"));
var settings_1 = require("./constants/settings");
var tp_controller_1 = require("./tp-controller");
var mock_heartrate_1 = require("./utils/mock-heartrate");
var ws_controller_1 = require("./ws-controller");
var HYPERATE_WEBSOCKET_URL = "wss://app.hyperate.io/socket/websocket";
var TOUCHPORTAL_PLUGIN_ID = "markusbink.TouchPortalHypeRatePlugin";
var tpService = new tp_controller_1.TPController(TOUCHPORTAL_PLUGIN_ID);
var wss = new ws_1.default(HYPERATE_WEBSOCKET_URL);
var wsController = new ws_controller_1.WSController(wss, tpService);
var hypeRateUserId = tpService.getSettingByKey(settings_1.Setting.HYPERATE_ID);
wss.on("open", function () { return wsController.join(hypeRateUserId); });
wss.on("message", function (payload) { return wsController.onMessage(payload); });
mock_heartrate_1.sendMockHeartrate(tpService.client, 3000);
