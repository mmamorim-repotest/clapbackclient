"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_js_1 = __importDefault(require("./schema.js"));
const model_js_1 = __importDefault(require("./model.js"));
const socket_io_client_1 = require("socket.io-client");
const axios_1 = __importDefault(require("axios"));
const clapback_js_1 = __importDefault(require("./clapback.js"));
class Entity {
    constructor(entityName) {
        this.schema = null;
        this.objSchema = {};
        this._model = null;
        this.socket = null;
        this.entityName = entityName;
        this._model = new model_js_1.default(entityName);
        this.socket = (0, socket_io_client_1.io)(clapback_js_1.default.host);
    }
    getEntityName() {
        return this.entityName;
    }
    getSchema() {
        return this.objSchema;
    }
    setSchema(objSchema) {
        this.objSchema = objSchema;
        this.schema = new schema_js_1.default(objSchema);
        this._model.setSchema(this.schema);
    }
    validate(data) {
        return this.schema.validate(data);
    }
    model() {
        return this._model;
    }
    listen(cbfunc) {
        this.socket.on('changeEntity-' + this.entityName, (msg) => {
            cbfunc(msg);
        });
    }
    listenID(id, cbfunc) {
        let routeName = this.entityName.toLowerCase();
        (0, axios_1.default)({
            method: 'post',
            url: clapback_js_1.default.host + '/entities/' + routeName + "/listenid",
            data: { id }
        }).then((res) => {
            console.log("listenID added", res);
        }).catch((e) => {
            console.log(e);
        });
        let msg = 'changeEntity-' + this.entityName + 'ID:' + id;
        this.socket.on(msg, (msg) => {
            cbfunc(msg);
        });
    }
}
exports.default = Entity;
