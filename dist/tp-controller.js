"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPController = void 0;
// @ts-ignore
var touchportal_api_1 = __importDefault(require("touchportal-api"));
var TPController = /** @class */ (function () {
    function TPController(pluginId) {
        this.tpClient = new touchportal_api_1.default.Client();
        console.log("TP Client initialized...");
        try {
            this.tpClient.connect({ pluginId: pluginId });
        }
        catch (err) {
            console.log(err);
            throw new Error("Could not connect to the plugin with ID " + pluginId);
        }
    }
    Object.defineProperty(TPController.prototype, "client", {
        get: function () {
            return this.tpClient;
        },
        enumerable: false,
        configurable: true
    });
    TPController.prototype.getSettingByKey = function (key) {
        return this.tpClient.on("Info", function (data) {
            try {
                return data.settings[0][key];
            }
            catch (err) {
                throw new Error("No settings exist for key: " + key);
            }
        });
    };
    TPController.prototype.updateState = function (key, value) {
        try {
            this.tpClient.stateUpdate(key, value);
        }
        catch (err) {
            console.log(err);
        }
    };
    return TPController;
}());
exports.TPController = TPController;
