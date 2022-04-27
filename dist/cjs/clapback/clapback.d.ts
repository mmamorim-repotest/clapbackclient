import Entity from "./entity.js";
export default class Clapback {
    static host: string;
    private entities;
    ready: Promise<any>;
    constructor(host: string);
    getEntities(): Promise<any>;
    entity(entityName: string): Entity;
}
