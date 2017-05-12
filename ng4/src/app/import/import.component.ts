import { Component, ViewChild, ElementRef } from '@angular/core';
import { Wizard } from 'clarity-angular';
import { ImportSchema, ImportField, Match } from './import-schema';
import { ImportService } from './import.service';

@Component({
  selector: 'import-component',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
  providers: []
})
export class ImportComponent {

    @ViewChild(Wizard) wizard: Wizard;
    opened: boolean = false; // you can open the wizard by setting this variable to true

    @ViewChild('fileUpload') fileUpload: ElementRef;

    filename: string;
    fileContents: string;

    lines: Array<any> = [];
    columns: Array<string> = [];
    rows: Array<any> = [];
    firstRowIsHeader: boolean = true;

    schema: ImportSchema;
    matches: Array<Match> = [];

    constructor(private importService: ImportService) { }

    open(schema: ImportSchema) {
        this.schema = schema;
        this.opened = true;
    }

    chooseFile() {
        this.fileUpload.nativeElement.click();
    }

    onFileSelected(result: any) {
        let me = this;

        let file = result.target.files[0];
        me.filename = file.name;

        let reader = new FileReader();

        reader.onload = function(event) {
            me.fileContents = reader.result;
        };

        reader.readAsText(file);
    }

    onPreviewFile() {

        this.columns = [];
        this.rows = [];

        this.lines = this.fileContents.split('\n');

        let firstLine = this.lines[0].split(';');
        firstLine.forEach((column: any, index: number) => {
            if (column) {
                this.columns.push((index + 1).toString());
            }
        });

        for (let l: number = 0; l < (5 || this.lines.length); l++) {
            let line = this.lines[l];
            if (line) {
                let row = line.split(';').splice(0, this.columns.length);
                this.rows.push(row);
            }
        }
    }

    private assignableFields: Array<ImportField> = [];
    private requiredFieldsAssigned: boolean = false;

    onMatchRecords() {

        this.matches = [];

        let firstRow = this.firstRowIsHeader ? this.rows[1]: this.rows[0];
        firstRow.forEach((column: string, index: number) => {
            this.matches.push(new Match(column, index));
        });

        this.assignableFields = this.schema.fields.slice(0);
    }

    select(match: Match) {
        // [checked]="match.selected" (change)="select(match)"
        // match.selected = true;
    }

    calculateAssigning() {
        this.requiredFieldsAssigned = !(this.assignableFields.find((item) => item.required === true));
    }

    assign(match: Match, assignee: ImportField) {
        console.log(match);
        console.log(assignee);

        match.schemaField = assignee;
        this.assignableFields.splice(this.assignableFields.indexOf(assignee), 1);
        this.calculateAssigning();
    }

    unassign(match: Match) {
        console.log(match);

        this.assignableFields.push(match.schemaField);
        this.calculateAssigning();
        match.schemaField = null;
    }

    validationError: string = null;
    lineNumber = 0;
    schemaValid = false;
    records: Array<any>;

    onValidateSchema() {

        this.validationError = null;
        this.schemaValid = false;
        this.lineNumber = 0;
        this.records = [];

        let boundFields = this.matches.filter((match) => match.schemaField);

        for (let l: number = 0; l < this.lines.length; l++) {
            this.lineNumber = l + 1;

            if (this.lines[l].trim() == '') {
                continue; // skip empty lines
            }

            let columns = this.lines[l].split(';');
            if (columns.length < boundFields[boundFields.length - 1].filePosition) {
                this.validationError = `Line contains less columns than expected (${columns.length})`;
                break;
            }

            for (let f: number = 0; f < boundFields.length; f++) {
                let field = boundFields[f];

                let value = columns[field.filePosition];

                if (field.schemaField.required && (!value || value.trim() == '')) {
                    this.validationError = 'Required field is empty in column ' + (field.filePosition + 1);
                    break;
                }
            };

            if (this.validationError) break;

            this.records.push(columns);
        };

        this.schemaValid = !this.validationError;
    }

    onImportData() {

        // let importingItems = this.importService.itemImported.subscribe();

        this.importService.import(this.records, this.schema);
    }
}
