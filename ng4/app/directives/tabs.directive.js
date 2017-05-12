"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
/** This component (structural directive) implements the functionality of tabs (consisting of one or more tab elements). */
var TabsDirective = (function () {
    function TabsDirective() {
        this.tabs = [];
    }
    /** This method select a tab and deselects all other tabs in container. */
    TabsDirective.prototype.selectTab = function (tab) {
        this.tabs.forEach(function (item) {
            item.active = false;
        });
        tab.active = true;
    };
    /** This method adds a tab to the container and marks it as active. */
    TabsDirective.prototype.addTab = function (tab) {
        if (this.tabs.length === 0) {
            tab.active = true;
        }
        this.tabs.push(tab);
    };
    return TabsDirective;
}());
TabsDirective = __decorate([
    core_1.Component({
        selector: 'tabs',
        template: "\n    <ul class=\"nav nav-tabs\">\n        <li *ngFor=\"let tab of tabs\" (click)=\"selectTab(tab)\" [class.active]=\"tab.active\">\n            <a>{{ tab.tabTitle }}</a>\n        </li>\n    </ul>\n    <ng-content class=\"tab-content\"></ng-content>\n    "
    })
], TabsDirective);
exports.TabsDirective = TabsDirective;
/** This component (structural directive) implements the functionality of a tab element (part of the tabs directive). */
var TabDirective = (function () {
    /** This method constructs a tab and with that adds it to the parent container. */
    function TabDirective(tabs) {
        tabs.addTab(this);
    }
    return TabDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TabDirective.prototype, "tabTitle", void 0);
TabDirective = __decorate([
    core_1.Component({
        selector: 'tab',
        template: "\n    <div [hidden]=\"!active\">\n      <ng-content></ng-content>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [TabsDirective])
], TabDirective);
exports.TabDirective = TabDirective;
//# sourceMappingURL=tabs.directive.js.map