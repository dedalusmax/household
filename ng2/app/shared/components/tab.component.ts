import { Component, Input } from '@angular/core';
import { TabsComponent } from './tabs.component';

/** This component (structural directive) implements the functionality of a tab element (part of the tabs directive). */
@Component({
    selector: 'tab',
    template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {

    @Input() tabTitle;
    active: boolean;

    /** This method constructs a tab and with that adds it to the parent container. */
    constructor(tabs: TabsComponent) {
        tabs.addTab(this);
    }
}
