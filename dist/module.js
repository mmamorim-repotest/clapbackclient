import $hgUW1$axios from "axios";
import {io as $hgUW1$io} from "socket.io-client";
import $hgUW1$ajv from "ajv";



class $ade9fe04035e6d84$export$2e2bcd8739ae039 {
    constructor(objSchema){
        this.objSchema = objSchema;
        this.ajv = new $hgUW1$ajv();
        this.validator = this.ajv.compile(objSchema);
    }
    getTypeDescription() {
        let typeDesc = {};
        for(let key in this.objSchema.properties)typeDesc[key] = this.objSchema.properties[key].type;
        return typeDesc;
    }
    validate(data) {
        this.validator(data);
        return this.validator.errors;
    }
}




class $9c53ba3a5770fa6e$export$2e2bcd8739ae039 {
    schema = null;
    constructor(entityName){
        this.entityName = entityName;
    }
    setSchema(schema) {
        this.schema = schema;
    }
    async set(data) {
        let routeName = this.entityName.toLowerCase();
        let path = $c387178060fea961$export$2e2bcd8739ae039.host + '/entities/' + routeName;
        if (this.schema) {
            let error = this.schema.validate(data);
            if (error) {
                console.log(`VALIDATE ERROR on setting [${this.entityName}]`);
                throw error;
            }
        }
        const res = await $hgUW1$axios.put(path, data);
        return res.data;
    }
    async getAll() {
        let routeName = this.entityName.toLowerCase();
        //console.log("GET request: "+Clapback.host + '/entities/' + routeName)
        let response = await $hgUW1$axios({
            method: 'get',
            url: $c387178060fea961$export$2e2bcd8739ae039.host + '/entities/' + routeName,
            data: {}
        });
        //console.log("response.data",response.data);
        return response.data;
    }
    async getId(id) {
        let routeName = this.entityName.toLowerCase();
        //console.log("GET request: "+Clapback.host + '/entities/' + routeName)
        try {
            let response = await $hgUW1$axios({
                method: 'get',
                url: $c387178060fea961$export$2e2bcd8739ae039.host + '/entities/' + routeName + "/" + id,
                data: {}
            });
            //console.log("response.data",response.data);
            return response.data;
        } catch (e) {
            return {
                error: "Entity name required!"
            };
        }
    }
    createClone(obj) {
        let self = this;
        let clone = JSON.parse(JSON.stringify(obj));
        let save = async function() {
            let dataSafe = JSON.parse(JSON.stringify(clone));
            //console.log("chamei save com dataSafe", dataSafe);
            await self.set(dataSafe);
        };
        clone.save = save;
        return clone;
    }
    get(id, cbfunc) {
        let self = this;
        this.getId(id).then((data)=>{
            let dataSafe = self.createClone(data);
            cbfunc(dataSafe);
        });
    }
}





class $bad766c101c17e85$export$2e2bcd8739ae039 {
    schema = null;
    objSchema = {};
    _model = null;
    socket = null;
    constructor(entityName){
        this.entityName = entityName;
        this._model = new $9c53ba3a5770fa6e$export$2e2bcd8739ae039(entityName);
        this.socket = $hgUW1$io($c387178060fea961$export$2e2bcd8739ae039.host);
    }
    getEntityName() {
        return this.entityName;
    }
    getSchema() {
        return this.objSchema;
    }
    setSchema(objSchema) {
        this.objSchema = objSchema;
        this.schema = new $ade9fe04035e6d84$export$2e2bcd8739ae039(objSchema);
        this._model.setSchema(this.schema);
    }
    validate(data) {
        return this.schema.validate(data);
    }
    model() {
        return this._model;
    }
    listen(cbfunc) {
        //this.socket.emit('chat message', "oi server");
        this.socket.on('changeEntity-' + this.entityName, (msg)=>{
            //console.log('changeEvent', msg);
            cbfunc(msg);
        });
    }
    listenID(id, cbfunc) {
        //this.socket.emit('chat message', "oi server");
        let routeName = this.entityName.toLowerCase();
        //console.log("GET request: "+Clapback.host + '/entities/' + routeName)
        $hgUW1$axios({
            method: 'post',
            url: $c387178060fea961$export$2e2bcd8739ae039.host + '/entities/' + routeName + "/listenid",
            data: {
                id: id
            }
        }).then((res)=>{
            console.log("listenID added", res);
        }).catch((e)=>{
            console.log(e);
        });
        let msg1 = 'changeEntity-' + this.entityName + 'ID:' + id;
        this.socket.on(msg1, (msg)=>{
            //console.log('changeEvent', msg);
            cbfunc(msg);
        });
    }
}


class $c387178060fea961$export$2e2bcd8739ae039 {
    entities = {};
    constructor(host){
        $c387178060fea961$export$2e2bcd8739ae039.host = host;
        let self = this;
        this.ready = new Promise((_resolve, _reject)=>{
            self.getEntities().then((data)=>{
                _resolve(data);
            }).catch((e)=>{
                console.log("error getEntities ", e.code);
            });
        });
    }
    async getEntities() {
        let response = await $hgUW1$axios({
            method: 'get',
            url: $c387178060fea961$export$2e2bcd8739ae039.host + '/entities',
            data: {}
        });
        this.entities = {};
        for(let key in response.data){
            this.entities[key] = new $bad766c101c17e85$export$2e2bcd8739ae039(response.data[key].name);
            this.entities[key].setSchema(response.data[key].schema);
        }
        return response.data;
    }
    entity(entityName) {
        if (entityName == undefined) throw new Error("Entity name required!");
        if (this.entities[entityName] == undefined) throw new Error("Entity name not found!");
        return this.entities[entityName];
    }
}




export {$c387178060fea961$export$2e2bcd8739ae039 as Clapback};
//# sourceMappingURL=module.js.map
