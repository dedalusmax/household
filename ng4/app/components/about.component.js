"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AboutComponent = (function () {
    function AboutComponent() {
    }
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'about',
        template: "\n<div class=\"row\">\n    <div class=\"offset-md-4 col-md-1\">\n        <clr-icon shape=\"home\" size=\"120\"></clr-icon>\n    </div>\n    <div class=\"col-md-4\">\n        <h1>Household</h1>\n        An application for managing household accounts.\n    </div>\n</div>\n  "
    })
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map