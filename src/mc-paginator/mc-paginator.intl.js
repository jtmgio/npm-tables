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
exports.__esModule = true;
var material_1 = require("@angular/material");
var MCCustomPaginatorIntl = (function (_super) {
    __extends(MCCustomPaginatorIntl, _super);
    function MCCustomPaginatorIntl() {
        var _this = _super.call(this) || this;
        _this.itemsPerPageLabel = "per page";
        return _this;
    }
    return MCCustomPaginatorIntl;
}(material_1.MatPaginatorIntl));
exports.MCCustomPaginatorIntl = MCCustomPaginatorIntl;
