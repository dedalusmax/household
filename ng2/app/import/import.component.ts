import { Component, ViewChild, ElementRef } from "@angular/core";
import { Wizard } from "clarity-angular";
import { ImportSchema, ImportField, Match } from './import-schema';

@Component({
  selector: 'import-component',
  templateUrl: './app/import/import.component.html',
  styles: [`
  .highlighted {
      background-color: lightsteelblue;
  }
  .required {
      font-weight: bold;
  }
  `],
  providers: []
})
export class ImportComponent {

    @ViewChild(Wizard) wizard: Wizard;
    opened: boolean = false; // you can open the wizard by setting this variable to true

    fileContents: string;

    columns: Array<string> = [];
    rows: Array<any> = [];
    firstRowIsHeader: boolean = true;

    schema: ImportSchema;
    matches: Array<Match> = [];

    open(schema: ImportSchema) {
        this.schema = schema;
        this.opened = true;
    }

    onFileSelected(result) {
        let me = this;

        let file = result.target.files[0];

        let reader = new FileReader();

        reader.onload = function(event) {

            me.fileContents = reader.result;
        };

        reader.readAsText(file);
    }

    onPreviewFile() {

        this.columns = [];
        this.rows = [];

        let lines = this.fileContents.split('\n');

        let firstLine = lines[0].split(';');
        firstLine.forEach((column, index) => {
            if (column) {
                this.columns.push((index + 1).toString());
            }
        });
        
        for (let l: number = 0; l < (5 || lines.length); l++) {
            let line = lines[l];
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

        this.rows[0].forEach((column: string, index: number) => {
            this.matches.push(new Match(column, index));
        });

        this.assignableFields = this.schema.fields.slice(0);

    }

    select(match: Match) {
        // [checked]="match.selected" (change)="select(match)"
        match.selected = true;
    }

    calculateAssigning() {
        this.requiredFieldsAssigned = !(this.assignableFields.find((item) => item.required === true))
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
}