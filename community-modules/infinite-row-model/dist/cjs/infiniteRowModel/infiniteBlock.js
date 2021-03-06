"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@ag-grid-community/core");
var InfiniteBlock = /** @class */ (function (_super) {
    __extends(InfiniteBlock, _super);
    function InfiniteBlock(pageNumber, params) {
        var _this = _super.call(this, pageNumber, params) || this;
        _this.cacheParams = params;
        return _this;
    }
    InfiniteBlock.prototype.getDisplayIndexStart = function () {
        return this.getBlockNumber() * this.cacheParams.blockSize;
    };
    // this is an estimate, as the last block will probably only be partially full. however
    // this method is used to know if this block is been rendered, before destroying, so
    // and this estimate works in that use case.
    InfiniteBlock.prototype.getDisplayIndexEnd = function () {
        return this.getDisplayIndexStart() + this.cacheParams.blockSize;
    };
    InfiniteBlock.prototype.createBlankRowNode = function (rowIndex) {
        var rowNode = _super.prototype.createBlankRowNode.call(this);
        rowNode.uiLevel = 0;
        this.setIndexAndTopOnRowNode(rowNode, rowIndex);
        return rowNode;
    };
    InfiniteBlock.prototype.setDataAndId = function (rowNode, data, index) {
        if (core_1._.exists(data)) {
            // this means if the user is not providing id's we just use the
            // index for the row. this will allow selection to work (that is based
            // on index) as long user is not inserting or deleting rows,
            // or wanting to keep selection between server side sorting or filtering
            rowNode.setDataAndId(data, index.toString());
        }
        else {
            rowNode.setDataAndId(undefined, undefined);
        }
    };
    InfiniteBlock.prototype.setRowNode = function (rowIndex, rowNode) {
        _super.prototype.setRowNode.call(this, rowIndex, rowNode);
        this.setIndexAndTopOnRowNode(rowNode, rowIndex);
    };
    // no need for @postConstruct, as attached to parent
    InfiniteBlock.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    InfiniteBlock.prototype.getNodeIdPrefix = function () {
        return null;
    };
    InfiniteBlock.prototype.getRow = function (displayIndex) {
        return this.getRowUsingLocalIndex(displayIndex);
    };
    InfiniteBlock.prototype.setIndexAndTopOnRowNode = function (rowNode, rowIndex) {
        rowNode.setRowIndex(rowIndex);
        rowNode.rowTop = this.cacheParams.rowHeight * rowIndex;
    };
    InfiniteBlock.prototype.loadFromDatasource = function () {
        var _this = this;
        var params = this.createLoadParams();
        if (core_1._.missing(this.params.datasource.getRows)) {
            console.warn("ag-Grid: datasource is missing getRows method");
            return;
        }
        // put in timeout, to force result to be async
        window.setTimeout(function () {
            _this.params.datasource.getRows(params);
        }, 0);
    };
    InfiniteBlock.prototype.processServerFail = function () {
        // todo - this method has better handling in SSRM
    };
    InfiniteBlock.prototype.createLoadParams = function () {
        // PROBLEM . . . . when the user sets sort via colDef.sort, then this code
        // is executing before the sort is set up, so server is not getting the sort
        // model. need to change with regards order - so the server side request is
        // AFTER thus it gets the right sort model.
        var params = {
            startRow: this.getStartRow(),
            endRow: this.getEndRow(),
            successCallback: this.pageLoaded.bind(this, this.getVersion()),
            failCallback: this.pageLoadFailed.bind(this, this.getVersion()),
            sortModel: this.params.sortModel,
            filterModel: this.params.filterModel,
            context: this.gridOptionsWrapper.getContext()
        };
        return params;
    };
    InfiniteBlock.prototype.forEachNode = function (callback, sequence, rowCount) {
        var _this = this;
        this.rowNodes.forEach(function (rowNode, index) {
            var rowIndex = _this.startRow + index;
            if (rowIndex < rowCount) {
                callback(rowNode, sequence.next());
            }
        });
    };
    InfiniteBlock.prototype.getLastAccessed = function () {
        return this.lastAccessed;
    };
    InfiniteBlock.prototype.getRow = function (rowIndex, dontTouchLastAccessed) {
        if (dontTouchLastAccessed === void 0) { dontTouchLastAccessed = false; }
        if (!dontTouchLastAccessed) {
            this.lastAccessed = this.params.lastAccessedSequence.next();
        }
        var localIndex = rowIndex - this.startRow;
        return this.rowNodes[localIndex];
    };
    InfiniteBlock.prototype.getStartRow = function () {
        return this.startRow;
    };
    InfiniteBlock.prototype.getEndRow = function () {
        return this.endRow;
    };
    // creates empty row nodes, data is missing as not loaded yet
    InfiniteBlock.prototype.createRowNodes = function () {
        this.rowNodes = [];
        for (var i = 0; i < this.params.blockSize; i++) {
            var rowIndex = this.startRow + i;
            var rowNode = this.getContext().createBean(new core_1.RowNode());
            rowNode.setRowHeight(this.params.rowHeight);
            rowNode.uiLevel = 0;
            rowNode.setRowIndex(rowIndex);
            rowNode.rowTop = this.params.rowHeight * rowIndex;
            this.rowNodes.push(rowNode);
        }
    };
    InfiniteBlock.prototype.processServerResult = function (params) {
        var _this = this;
        var rowNodesToRefresh = [];
        this.rowNodes.forEach(function (rowNode, index) {
            var data = params.rowData ? params.rowData[index] : undefined;
            if (rowNode.stub) {
                rowNodesToRefresh.push(rowNode);
            }
            _this.setDataAndId(rowNode, data, _this.startRow + index);
        });
        if (rowNodesToRefresh.length > 0) {
            this.rowRenderer.redrawRows(rowNodesToRefresh);
        }
        var finalRowCount = params.rowCount != null && params.rowCount >= 0 ? params.rowCount : undefined;
        this.parentCache.pageLoaded(this, finalRowCount);
    };
    InfiniteBlock.prototype.destroyRowNodes = function () {
        this.rowNodes.forEach(function (rowNode) {
            // this is needed, so row render knows to fade out the row, otherwise it
            // sees row top is present, and thinks the row should be shown. maybe
            // rowNode should have a flag on whether it is visible???
            rowNode.clearRowTop();
        });
    };
    __decorate([
        core_1.Autowired('rowRenderer')
    ], InfiniteBlock.prototype, "rowRenderer", void 0);
    __decorate([
        core_1.PostConstruct
    ], InfiniteBlock.prototype, "postConstruct", null);
    __decorate([
        core_1.PreDestroy
    ], InfiniteBlock.prototype, "destroyRowNodes", null);
    return InfiniteBlock;
}(core_1.RowNodeBlock));
exports.InfiniteBlock = InfiniteBlock;
//# sourceMappingURL=infiniteBlock.js.map