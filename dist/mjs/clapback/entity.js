import Schema from "./schema.js";
import Model from "./model.js";
import { io } from "socket.io-client";
import axios from "axios";
import Clapback from "./clapback.js";
export default class Entity {
    constructor(entityName) {
        this.schema = null;
        this.objSchema = {};
        this._model = null;
        this.socket = null;
        this.entityName = entityName;
        this._model = new Model(entityName);
        this.socket = io(Clapback.host);
    }
    getEntityName() {
        return this.entityName;
    }
    getSchema() {
        return this.objSchema;
    }
    setSchema(objSchema) {
        this.objSchema = objSchema;
        this.schema = new Schema(objSchema);
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
        axios({
            method: 'post',
            url: Clapback.host + '/entities/' + routeName + "/listenid",
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
