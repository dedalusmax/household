import { Component, Input } from '@angular/core';

/** This component (structural directive) implements the functionality of tabs (consisting of one or more tab elements). */
@Component({
    selector: 'tabs',
    template: `
    <ul class="nav nav-tabs">
        <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
            <a>{{ tab.tabTitle }}</a>
        </li>
    </ul>
    <ng-content class="tab-content"></ng-content>
    `
})
export class TabsDirective {

    tabs: TabDirective[] = [];

    /** This method select a tab and deselects all other tabs in container. */
    selectTab(tab: TabDirective) {
        this.tabs.forEach((item) => {
            item.active = false;
        });
        tab.active = true;
    }

    /** This method adds a tab to the container and marks it as active. */
    addTab(tab: TabDirective) {
        if (this.tabs.length === 0) {
            tab.active = true;
        }
        this.tabs.push(tab);
    }
}

/** This component (structural directive) implements the functionality of a tab element (part of the tabs directive). */
@Component({
    selector: 'tab',
    template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class TabDirective {

    @Input() tabTitle: string;
    active: boolean;

    /** This method constructs a tab and with that adds it to the parent container. */
    constructor(tabs: TabsDirective) {
        tabs.addTab(this);
    }
}
