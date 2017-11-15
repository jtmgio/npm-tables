"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var button_1 = require("@angular/material/button");
var select_1 = require("@angular/material/select");
var tooltip_1 = require("@angular/material/tooltip");
var mc_paginator_1 = require("./mc-paginator");
var mc_paginator_intl_1 = require("./mc-paginator.intl");
var MCPaginatorModule = (function () {
    function MCPaginatorModule() {
    }
    return MCPaginatorModule;
}());
MCPaginatorModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            button_1.MatButtonModule,
            select_1.MatSelectModule,
            tooltip_1.MatTooltipModule,
        ],
        exports: [mc_paginator_1.MCPaginator],
        declarations: [mc_paginator_1.MCPaginator],
        providers: [mc_paginator_intl_1.MCCustomPaginatorIntl]
    })
], MCPaginatorModule);
exports.MCPaginatorModule = MCPaginatorModule;
