export class ImportSchema {

    fields: Array<ImportField>;

    constructor(public controllerName: string) {
        this.fields = [];
    }
}

export class ImportField {

    required: boolean = false;

    constructor(public name: string, public caption: string) { }
}

export class Match {
    // fileColumn: string;
    // filePosition: number;
    selected: boolean = false;
    schemaField: ImportField;
    description: string;

    constructor(public fileColumn: string, filePosition: number) { }
}
