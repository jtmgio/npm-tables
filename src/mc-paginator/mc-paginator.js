"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var MCPaginator = (function (_super) {
    __extends(MCPaginator, _super);
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - constructor
    **-------------------------------------------------------------------------------------
    */
    function MCPaginator(intl, changeDetectorRef) {
        var _this = _super.call(this, intl, changeDetectorRef) || this;
        _this.intl = intl;
        _this.changeDetectorRef = changeDetectorRef;
        //keep track of the current page
        _this.currentPage = 0;
        _this.intlData = _this._intl;
        return _this;
    }
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - getPages
    **-------------------------------------------------------------------------------------
    */
    MCPaginator.prototype.getPages = function () {
        //build page array off length of list
        return Array.from(Array(Math.round(this.length / this.pageSize)).keys());
    };
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - changePage
    **-------------------------------------------------------------------------------------
    */
    MCPaginator.prototype.changePage = function (page) {
        this.pageIndex = page - 1;
        this.nextPage();
    };
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - changePageSize
    **-------------------------------------------------------------------------------------
    */
    MCPaginator.prototype.changePageSize = function (value) {
        this._changePageSize(value);
        return;
    };
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - roundPage
    **-------------------------------------------------------------------------------------
    */
    MCPaginator.prototype.roundPage = function (page) {
        return Math.round(page);
    };
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - mcNextPage
    **-------------------------------------------------------------------------------------
    */
    MCPaginator.prototype.mcNextPage = function () {
        this.currentPage = this.pageIndex + 1;
        this.nextPage();
    };
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - mcPrevPage
    **-------------------------------------------------------------------------------------
    */
    MCPaginator.prototype.mcPrevPage = function () {
        this.currentPage = this.pageIndex - 1;
        this.previousPage();
    };
    return MCPaginator;
}(material_1.MatPaginator));
MCPaginator = __decorate([
    core_1.Component({
        selector: "mc-paginator",
        styleUrls: ["mc-paginator.scss"],
        templateUrl: "./mc-paginator.html"
    })
], MCPaginator);
exports.MCPaginator = MCPaginator;
