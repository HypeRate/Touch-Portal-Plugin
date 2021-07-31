"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSController = void 0;
var states_1 = require("./constants/states");
var WSController = /** @class */ (function () {
    function WSController(wss, tpService) {
        this.wss = wss;
        this.tpService = tpService;
    }
    WSController.prototype.join = function (hypeRateUserId) {
        var payload = {
            topic: "hr:" + hypeRateUserId,
            event: "phx_join",
            payload: {},
            ref: 0,
        };
        this.wss.send(JSON.stringify(payload));
    };
    WSController.prototype.sendHeartbeat = function () {
        var _this = this;
        var payload = {
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: 0,
        };
        // Send heartbeat every 25 seconds to keep connection alive
        setInterval(function () {
            _this.wss.send(JSON.stringify(payload));
        }, 25000);
    };
    WSController.prototype.onMessage = function (payload) {
        var message = JSON.parse(payload);
        switch (message.event) {
            case "hr_update":
                var heartRate = message.payload.hr;
                this.tpService.updateState(states_1.State.CURRENT_HEARTRATE, heartRate);
                break;
            default:
                console.log("Message type does not exist");
        }
    };
    return WSController;
}());
exports.WSController = WSController;
