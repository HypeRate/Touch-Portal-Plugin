"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSController = void 0;
var states_1 = require("./constants/states");
var WSController = /** @class */ (function () {
    function WSController(wss, tpService) {
        this.wss = wss;
        this.tpService = tpService;
    }
    /**
     * Conntects to the Hyperate WebSocket
     * @param hypeRateUserId HypeRate User ID
     */
    WSController.prototype.join = function (hypeRateUserId) {
        var payload = {
            topic: "hr:".concat(hypeRateUserId),
            event: "phx_join",
            payload: {},
            ref: 0,
        };
        this.wss.send(JSON.stringify(payload));
    };
    /**
     * Sends a heartbeat to the Hyperate WebSocket
     * to keep connection alive
     */
    WSController.prototype.sendHeartbeat = function () {
        var _this = this;
        var payload = {
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: 0,
        };
        setInterval(function () {
            _this.wss.send(JSON.stringify(payload));
        }, 25000);
    };
    /**
     * Callback for when a message is received from the Hyperate WebSocket
     * @param payload Payload received from the Hyperate WebSocket
     */
    WSController.prototype.onMessage = function (payload) {
        var message = JSON.parse(payload);
        switch (message.event) {
            case "hr_update":
                var heartRate = message.payload.hr;
                this.tpService.updateState(states_1.State.CURRENT_HEARTRATE, heartRate);
                break;
            case "phx_reply":
                console.log("phx_reply", message.topic);
                break;
            default:
                console.log("Message type does not exist: ".concat(message.event));
        }
    };
    return WSController;
}());
exports.WSController = WSController;
