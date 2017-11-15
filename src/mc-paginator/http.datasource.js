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
var collections_1 = require("@angular/cdk/collections");
var Rx_1 = require("rxjs/Rx");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/map");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/switchMap");
require("rxjs/add/observable/merge");
var MCHTTPDataSource = (function (_super) {
    __extends(MCHTTPDataSource, _super);
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - contructor
    **-------------------------------------------------------------------------------------
    */
    function MCHTTPDataSource(service, //Must be of type AbstractTableService
        paginator, //we pass reference to the paginator
        sort, //pass reference to the MatSor
        columns //Column definitions
    ) {
        var _this = 
        //we have to call super() per NG
        _super.call(this) || this;
        _this.service = service;
        _this.paginator = paginator;
        _this.sort = sort;
        _this.columns = columns; //Column definitions
        _this.resultsLength = 0;
        _this.filterChange = new BehaviorSubject_1.BehaviorSubject('');
        _this.isLoading = false;
        return _this;
    }
    Object.defineProperty(MCHTTPDataSource.prototype, "filter", {
        /*
        **-------------------------------------------------------------------------------------
        ** METHOD NAME - getFilter
        **-------------------------------------------------------------------------------------
        */
        get: function () {
            return this.filterChange.value;
        },
        /*
        **-------------------------------------------------------------------------------------
        ** METHOD NAME - setFilter
        **-------------------------------------------------------------------------------------
        */
        set: function (filter) {
            this.filterChange.next(filter);
        },
        enumerable: true,
        configurable: true
    });
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - connect
    **-------------------------------------------------------------------------------------
    */
    MCHTTPDataSource.prototype.connect = function () {
        var _this = this;
        //page and sort change events
        var displayDataChanges = [
            this.paginator.page,
            this.sort.sortChange,
            this.filterChange
        ];
        //if sorting is done go to page 1
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        //merge in event streams
        return Rx_1.Observable.merge.apply(Rx_1.Observable, displayDataChanges).startWith(null)
            .switchMap(function () {
            _this.isLoading = true;
            return _this.service.getList((_this.paginator.pageIndex + 1), _this.sort.active, _this.sort.direction, _this.filter);
        })
            .map(function (data) {
            _this.isLoading = false;
            _this.resultsLength = data.count;
            return data.list;
        })["catch"](function () {
            _this.isLoading = false;
            return Rx_1.Observable.of([]);
        });
    };
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - disconnect
    **-------------------------------------------------------------------------------------
    */
    MCHTTPDataSource.prototype.disconnect = function () { };
    return MCHTTPDataSource;
}(collections_1.DataSource));
exports.MCHTTPDataSource = MCHTTPDataSource;
