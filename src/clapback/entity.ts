import Schema from "./schema.js"
import Model from "./model.js"
import { io } from "socket.io-client"
import axios from "axios"
import Clapback from "./clapback.js"

  export default class Entity {
    private entityName: string
    private schema: Schema | any = null
    private objSchema: any = {}
    private _model: Model | any = null
    private socket: any = null

    constructor(entityName: string) {
        this.entityName = entityName
        this._model = new Model(entityName)
        this.socket = io(Clapback.host)
    }

    getEntityName() {
        return this.entityName
    }

    getSchema() {
        return this.objSchema
    }

    setSchema(objSchema: any) {
        this.objSchema = objSchema
        this.schema = new Schema(objSchema)
        this._model.setSchema(this.schema)
    }

    validate(data: any) {
        return this.schema.validate(data)
    }

    model() {
        return this._model
    }

    listen(cbfunc: Function) {
        //this.socket.emit('chat message', "oi server");
        this.socket.on('changeEntity-'+this.entityName, (msg: any) => {
            //console.log('changeEvent', msg);
            cbfunc(msg)
        });
    }

    listenID(id: string, cbfunc: Function) {
        //this.socket.emit('chat message', "oi server");
        let routeName = this.entityName.toLowerCase()
        //console.log("GET request: "+Clapback.host + '/entities/' + routeName)
        axios({
            method: 'post',
            url: Clapback.host + '/entities/' + routeName + "/listenid",
            data: { id }
        }).then((res) => {
            console.log("listenID added",res);
        }).catch((e) => {
            console.log(e);            
        })

        let msg = 'changeEntity-'+this.entityName+'ID:'+id
        this.socket.on(msg, (msg: any) => {
            //console.log('changeEvent', msg);
            cbfunc(msg)
        });
    }

}