
import axios from "axios"
import Entity from "./entity.js"

export default class Clapback {
    public static host: string
    private entities: any = {}
    public ready: Promise<any>

    constructor(host: string) {
        Clapback.host = host
        let self = this
        this.ready = new Promise((_resolve, _reject) => {
            self.getEntities().then((data) => {
                _resolve(data)
            })
        })
    }

    async getEntities() {
        let response = await axios({
            method: 'get',
            url: Clapback.host + '/entities',
            data: {}
        })
        this.entities = {}
        for(let key in response.data) {
            this.entities[key] = new Entity(response.data[key].name)
            this.entities[key].setSchema(response.data[key].schema)
        }
        return response.data
    }

    entity(entityName: string): Entity {
        if(entityName == undefined) { throw new Error("Entity name required!")}
        if(this.entities[entityName] == undefined) {
            throw new Error("Entity name not found!")
        }
        return this.entities[entityName]
    }

}