"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
class Schema {
    constructor(objSchema) {
        this.objSchema = objSchema;
        this.ajv = new ajv_1.default();
        this.validator = this.ajv.compile(objSchema);
    }
    getTypeDescription() {
        let typeDesc = {};
        for (let key in this.objSchema.properties) {
            typeDesc[key] = this.objSchema.properties[key].type;
        }
        return typeDesc;
    }
    validate(data) {
        this.validator(data);
        return this.validator.errors;
    }
}
exports.default = Schema;
