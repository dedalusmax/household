import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search-box',
    template: `
    <div>
        <input #input type="text" (input)="update.emit(input.value)">
    </div>
    `
})
export class SearchBoxComponent {
    @Output() update = new EventEmitter();

    ngOnInit() {
        this.update.emit('');
    }
}