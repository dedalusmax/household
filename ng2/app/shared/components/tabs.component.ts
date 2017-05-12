import { Component } from '@angular/core';
import { TabComponent } from './tab.component';

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
export class TabsComponent {

    tabs: TabComponent[] = [];

    /** This method select a tab and deselects all other tabs in container. */
    selectTab(tab: TabComponent) {
        this.tabs.forEach((item) => {
            item.active = false;
        });
        tab.active = true;
    }

    /** This method adds a tab to the container and marks it as active. */
    addTab(tab: TabComponent) {
        if (this.tabs.length === 0) {
            tab.active = true;
        }
        this.tabs.push(tab);
    }
}
