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
var MCClientDataSource = (function (_super) {
    __extends(MCClientDataSource, _super);
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - contructor
    **-------------------------------------------------------------------------------------
    */
    function MCClientDataSource(service, //Must be of type AbstractTableService
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
        _this.searchableKeys = [];
        columns.forEach(function (item) {
            if (item.searchable)
                _this.searchableKeys.push(item.name);
        });
        return _this;
    }
    Object.defineProperty(MCClientDataSource.prototype, "filter", {
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
    MCClientDataSource.prototype.connect = function () {
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
            //get my data from our server
            //TODO Implment interface to enforce GETLIST on DI service
            return _this.service.getList();
        })
            .map(function (data) {
            //figure out the page based pagesize/pageindex
            var startIndex = _this.paginator.pageIndex * _this.paginator.pageSize;
            //the full count
            _this.resultsLength = data.length;
            //slice data to conform to page options
            //if we arent sorting do nothing in reg ards to sorting
            if (!_this.sort.active || _this.sort.direction == "") {
                //lets filter the list down first
                var list = data.filter(function (item) {
                    return _this.filterList(item);
                });
                //get the end results total of the filter
                _this.resultsLength = list.length;
                //return the sliced list
                return _this.sliceList(list, startIndex);
            }
            //lets start the sorting				
            //sort by name
            var sort = data.filter(function (item) {
                return _this.filterList(item);
            });
            //Holds all of the sub comparator functions
            var subComparators = {
                string: function (a, b) {
                    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
                },
                number: function (a, b) {
                    return a - b;
                },
                date: function (a, b) {
                    var result = new Date(a).valueOf() - new Date(b).valueOf();
                    return result || 0;
                }
            };
            //Main comparator that does error checking and chooses the subComparator and picks out the data to compare
            var comparator = function (a, b) {
                var _a = _this.sort, active = _a.active, direction = _a.direction;
                var columnData = _this.columns.find(function (item) { return item.name === active; });
                if (!columnData || !columnData.canSort || !subComparators[columnData.type]) {
                    return 0;
                }
                var item1 = a[active];
                var item2 = b[active];
                var result = subComparators[columnData.type](item1, item2) || 0;
                return direction === "desc" ? result * -1 : result; //multiplying by -1 flips the direction
            };
            sort = sort.sort(comparator);
            _this.resultsLength = sort.length;
            //return sorted
            return _this.sliceList(sort, startIndex);
        })["catch"](function () {
            return Rx_1.Observable.of([]);
        });
    };
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - sliceList
    **-------------------------------------------------------------------------------------
    */
    MCClientDataSource.prototype.sliceList = function (data, startIndex) {
        return data.slice(startIndex, startIndex + this.paginator.pageSize);
    };
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - sliceList
    **-------------------------------------------------------------------------------------
    */
    MCClientDataSource.prototype.filterList = function (item) {
        var flag;
        for (var prop in item) {
            flag = false;
            if (this.searchableKeys.indexOf(prop) > -1) {
                flag = item[prop].toString().indexOf(this.filter) != -1;
                if (flag)
                    break;
            }
        }
        return flag;
    };
    /*
    **-------------------------------------------------------------------------------------
    ** METHOD NAME - disconnect
    **-------------------------------------------------------------------------------------
    */
    MCClientDataSource.prototype.disconnect = function () { };
    return MCClientDataSource;
}(collections_1.DataSource));
exports.MCClientDataSource = MCClientDataSource;
