"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._module = exports.Clapback = void 0;
const clapback_js_1 = __importDefault(require("./clapback/clapback.js"));
exports.Clapback = clapback_js_1.default;
exports._module = {
    fazAlgo: function () {
        console.log("faz algo");
    }
};
