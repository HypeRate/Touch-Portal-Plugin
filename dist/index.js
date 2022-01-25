"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var dotenv_1 = __importDefault(require("dotenv"));
var ws_1 = __importDefault(require("ws"));
var settings_1 = require("./constants/settings");
var tp_controller_1 = require("./tp-controller");
var ws_controller_1 = require("./ws-controller");
dotenv_1.default.config();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var HYPERATE_WEBSOCKET_URL, TOUCHPORTAL_PLUGIN_ID, tpService, wss, wsController_1, hypeRateUserId_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                HYPERATE_WEBSOCKET_URL = "wss://staging.frightrate.com/socket/websocket?token=".concat(process.env.HYPERATE_API_KEY);
                TOUCHPORTAL_PLUGIN_ID = "markusbink.TouchPortalHypeRatePlugin";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                tpService = new tp_controller_1.TPController(TOUCHPORTAL_PLUGIN_ID);
                wss = new ws_1.default(HYPERATE_WEBSOCKET_URL);
                wsController_1 = new ws_controller_1.WSController(wss, tpService);
                return [4 /*yield*/, tpService.getSettingByKey(settings_1.Setting.HYPERATE_ID)];
            case 2:
                hypeRateUserId_1 = _a.sent();
                if (wss) {
                    wss.on("open", function () { return wsController_1.join(hypeRateUserId_1); });
                    wsController_1.sendHeartbeat();
                    wss.on("message", function (payload) { return wsController_1.onMessage(payload); });
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log("Something went wrong...");
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })();
