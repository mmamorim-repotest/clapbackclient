import Schema from './schema';
import axios from "axios"
import Clapback from './clapback';

export default class Model {
    private entityName: string
    private schema: Schema | any = null

    constructor(entityName: string) {
        this.entityName = entityName
    }

    setSchema(schema: Schema) {
        this.schema = schema
    }

    async set(data: any) {
        let routeName = this.entityName.toLowerCase()
        let path = Clapback.host + '/entities/' + routeName
        if (this.schema) {
            let error = this.schema.validate(data)
            if (error) {
                console.log(`VALIDATE ERROR on setting [${this.entityName}]`);
                throw error
            }
        }
        const res = await axios.put(path, data);
        return res.data
    }

    async getAll() {
        let routeName = this.entityName.toLowerCase()
        //console.log("GET request: "+Clapback.host + '/entities/' + routeName)
        let response = await axios({
            method: 'get',
            url: Clapback.host + '/entities/' + routeName,
            data: {}
        })
        //console.log("response.data",response.data);
        return response.data
    }

    async getId(id: string) {
        let routeName = this.entityName.toLowerCase()
        //console.log("GET request: "+Clapback.host + '/entities/' + routeName)
        try {
            let response = await axios({
                method: 'get',
                url: Clapback.host + '/entities/' + routeName + "/" + id,
                data: {}
            })
            //console.log("response.data",response.data);
            return response.data
        } catch (e) {
            return { error: "Entity name required!" }
        }
    }

    private createClone(obj: any) {
        let self = this
        let clone = JSON.parse(JSON.stringify(obj))
        let save = async function () {
            let dataSafe = JSON.parse(JSON.stringify(clone))
            //console.log("chamei save com dataSafe", dataSafe);
            await self.set(dataSafe)
        }
        clone.save = save
        return clone
    }

    get(id: string, cbfunc: Function) {
        let self = this
        this.getId(id).then((data) => {
            let dataSafe = self.createClone(data)
            cbfunc(dataSafe);
        })
    }
}