import { Component, ViewChild, ElementRef } from "@angular/core";
import { Wizard } from "clarity-angular";

@Component({
  selector: 'import-component',
  templateUrl: './app/import/import.component.html',
  styles: [`
  .highlighted {
      background-color: lightsteelblue;
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

    open(source: ElementRef) {
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

        // lines.forEach((line, index) => {
        //     this.rows.push(line.split(';'));
        // });
    }
}