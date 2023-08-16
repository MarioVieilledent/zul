export class Module {
    name: string;
    type: string;
    rawScript: string;

    modules: Module[];

    constructor(name: string, type: string, rawScript: string) {
        this.name = name,
        this.type = type;
        this.rawScript = rawScript;
        this.modules = [];
    }
}