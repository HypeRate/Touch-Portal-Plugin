"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSController = void 0;
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
    WSController.prototype.onMessage = function (payload) {
        var message = JSON.parse(payload);
        switch (message.event) {
            case "phx_reply":
                this.tpService.updateState("hyperate_current_heartrate", 80);
                break;
            default:
                throw new Error("Message type does not exist");
        }
    };
    return WSController;
}());
exports.WSController = WSController;
