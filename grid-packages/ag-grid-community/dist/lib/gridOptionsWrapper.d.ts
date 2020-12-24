import { RowNode } from './entities/rowNode';
import { ChartRef, FillOperationParams, GetChartToolbarItems, GetContextMenuItems, GetMainMenuItems, GetRowNodeIdFunc, GetServerSideStoreParamsParams, GridOptions, IsApplyServerSideTransaction, IsRowMaster, IsRowSelectable, IsServerSideGroupOpenByDefaultParams, NavigateToNextCellParams, NavigateToNextHeaderParams, PaginationNumberFormatterParams, PostProcessPopupParams, ProcessChartOptionsParams, ProcessDataFromClipboardParams, ServerSideStoreParams, TabToNextCellParams, TabToNextHeaderParams } from './entities/gridOptions';
import { GridApi } from './gridApi';
import { ColDef, ColGroupDef, IAggFunc, SuppressKeyboardEventParams } from './entities/colDef';
import { ColumnApi } from './columnController/columnApi';
import { IViewportDatasource } from './interfaces/iViewportDatasource';
import { IDatasource } from './interfaces/iDatasource';
import { CellPosition } from './entities/cellPosition';
import { IServerSideDatasource } from './interfaces/iServerSideDatasource';
import { BaseExportParams, ProcessCellForExportParams, ProcessHeaderForExportParams } from './interfaces/exportParams';
import { AgEvent } from './events';
import { SideBarDef } from './entities/sideBar';
import { ChartOptions } from './interfaces/iChartOptions';
import { AgChartTheme, AgChartThemeOverrides } from "./interfaces/iAgChartOptions";
import { HeaderPosition } from './headerRendering/header/headerPosition';
export interface PropertyChangedEvent extends AgEvent {
    currentValue: any;
    previousValue: any;
}
export declare class GridOptionsWrapper {
    private static MIN_COL_WIDTH;
    static PROP_HEADER_HEIGHT: string;
    static PROP_GROUP_REMOVE_SINGLE_CHILDREN: string;
    static PROP_GROUP_REMOVE_LOWEST_SINGLE_CHILDREN: string;
    static PROP_PIVOT_HEADER_HEIGHT: string;
    static PROP_SUPPRESS_CLIPBOARD_PASTE: string;
    static PROP_GROUP_HEADER_HEIGHT: string;
    static PROP_PIVOT_GROUP_HEADER_HEIGHT: string;
    static PROP_FLOATING_FILTERS_HEIGHT: string;
    static PROP_SUPPRESS_ROW_CLICK_SELECTION: string;
    static PROP_SUPPRESS_ROW_DRAG: string;
    static PROP_SUPPRESS_MOVE_WHEN_ROW_DRAG: string;
    static PROP_POPUP_PARENT: string;
    static PROP_DOM_LAYOUT: string;
    static PROP_FILL_HANDLE_DIRECTION: string;
    private readonly gridOptions;
    private readonly columnController;
    private readonly eventService;
    private readonly environment;
    private readonly autoHeightCalculator;
    private propertyEventService;
    private domDataKey;
    private layoutElements;
    private scrollbarWidth;
    private updateLayoutClassesListener;
    private destroyed;
    private agWire;
    private destroy;
    init(): void;
    private checkColumnDefProperties;
    private checkGridOptionsProperties;
    private checkProperties;
    getDomDataKey(): string;
    getDomData(element: Node | null, key: string): any;
    setDomData(element: Element, key: string, value: any): any;
    isRowSelection(): boolean;
    isSuppressRowDeselection(): boolean;
    isRowSelectionMulti(): boolean;
    isRowMultiSelectWithClick(): boolean;
    getContext(): any;
    isPivotMode(): boolean;
    isSuppressExpandablePivotGroups(): boolean;
    getPivotColumnGroupTotals(): string | undefined;
    getPivotRowTotals(): string | undefined;
    isRowModelInfinite(): boolean;
    isRowModelViewport(): boolean;
    isRowModelServerSide(): boolean;
    isRowModelDefault(): boolean;
    isFullRowEdit(): boolean;
    isSuppressFocusAfterRefresh(): boolean;
    isSuppressBrowserResizeObserver(): boolean;
    isSuppressMaintainUnsortedOrder(): boolean;
    isSuppressClearOnFillReduction(): boolean;
    isShowToolPanel(): boolean;
    getSideBar(): SideBarDef;
    isSuppressTouch(): boolean;
    isApplyColumnDefOrder(): boolean;
    isSuppressRowTransform(): boolean;
    isSuppressColumnStateEvents(): boolean;
    isAllowDragFromColumnsToolPanel(): boolean;
    useAsyncEvents(): boolean;
    isEnableCellChangeFlash(): boolean;
    getCellFlashDelay(): number;
    getCellFadeDelay(): number;
    isGroupSelectsChildren(): boolean;
    isSuppressRowHoverHighlight(): boolean;
    isGroupSelectsFiltered(): boolean;
    isGroupHideOpenParents(): boolean;
    isGroupMultiAutoColumn(): boolean;
    isGroupRemoveSingleChildren(): boolean;
    isGroupRemoveLowestSingleChildren(): boolean;
    isGroupIncludeFooter(): boolean;
    isGroupIncludeTotalFooter(): boolean;
    isGroupSuppressBlankHeader(): boolean;
    isSuppressRowClickSelection(): boolean;
    isSuppressCellSelection(): boolean;
    isSuppressMultiSort(): boolean;
    isMultiSortKeyCtrl(): boolean;
    isGroupSuppressAutoColumn(): boolean;
    isPivotSuppressAutoColumn(): boolean;
    isSuppressDragLeaveHidesColumns(): boolean;
    isSuppressScrollOnNewData(): boolean;
    isRowDragManaged(): boolean;
    isSuppressRowDrag(): boolean;
    isSuppressMoveWhenRowDragging(): boolean;
    isEnableMultiRowDragging(): boolean;
    getDomLayout(): string;
    isSuppressHorizontalScroll(): boolean;
    isSuppressMaxRenderedRowRestriction(): boolean;
    isExcludeChildrenWhenTreeDataFiltering(): boolean;
    isAlwaysShowVerticalScroll(): boolean;
    isDebounceVerticalScrollbar(): boolean;
    isSuppressLoadingOverlay(): boolean;
    isSuppressNoRowsOverlay(): boolean;
    isSuppressFieldDotNotation(): boolean;
    getPinnedTopRowData(): any[] | undefined;
    getPinnedBottomRowData(): any[] | undefined;
    isFunctionsPassive(): boolean;
    isSuppressChangeDetection(): boolean;
    isSuppressAnimationFrame(): boolean;
    getQuickFilterText(): string | undefined;
    isCacheQuickFilter(): boolean;
    isUnSortIcon(): boolean;
    isSuppressMenuHide(): boolean;
    isEnterMovesDownAfterEdit(): boolean;
    isEnterMovesDown(): boolean;
    isUndoRedoCellEditing(): boolean;
    getUndoRedoCellEditingLimit(): number | undefined;
    getRowStyle(): any;
    getRowClass(): string | string[] | undefined;
    getRowStyleFunc(): Function | undefined;
    getRowClassFunc(): ((params: any) => string | string[]) | undefined;
    rowClassRules(): {
        [cssClassName: string]: string | ((params: any) => boolean);
    } | undefined;
    getServerSideStoreType(): string | undefined;
    getServerSideStoreParamsFunc(): ((params: GetServerSideStoreParamsParams) => ServerSideStoreParams) | undefined;
    getCreateChartContainerFunc(): ((params: ChartRef) => void) | undefined;
    getPopupParent(): HTMLElement | undefined;
    getBlockLoadDebounceMillis(): number | undefined;
    getPostProcessPopupFunc(): ((params: PostProcessPopupParams) => void) | undefined;
    getPaginationNumberFormatterFunc(): ((params: PaginationNumberFormatterParams) => string) | undefined;
    getChildCountFunc(): ((dataItem: any) => number) | undefined;
    getIsApplyServerSideTransactionFunc(): IsApplyServerSideTransaction | undefined;
    getDefaultGroupSortComparator(): ((nodeA: RowNode, nodeB: RowNode) => number) | undefined;
    getIsFullWidthCellFunc(): ((rowNode: RowNode) => boolean) | undefined;
    getFullWidthCellRendererParams(): any;
    isEmbedFullWidthRows(): boolean;
    isDetailRowAutoHeight(): boolean;
    getSuppressKeyboardEventFunc(): ((params: SuppressKeyboardEventParams) => boolean) | undefined;
    getBusinessKeyForNodeFunc(): ((node: RowNode) => string) | undefined;
    getApi(): GridApi | undefined | null;
    getColumnApi(): ColumnApi | undefined | null;
    isImmutableData(): boolean;
    isEnsureDomOrder(): boolean;
    isEnableCharts(): boolean;
    getColResizeDefault(): string | undefined;
    isSingleClickEdit(): boolean;
    isSuppressClickEdit(): boolean;
    isStopEditingWhenGridLosesFocus(): boolean;
    getGroupDefaultExpanded(): number | undefined;
    getMaxConcurrentDatasourceRequests(): number | undefined;
    getMaxBlocksInCache(): number | undefined;
    getCacheOverflowSize(): number | undefined;
    getPaginationPageSize(): number | undefined;
    isPaginateChildRows(): boolean;
    getCacheBlockSize(): number | undefined;
    getInfiniteInitialRowCount(): number | undefined;
    isPurgeClosedRowNodes(): boolean;
    isSuppressPaginationPanel(): boolean;
    getRowData(): any[] | undefined;
    isGroupUseEntireRow(pivotMode: boolean): boolean;
    isEnableRtl(): boolean;
    getAutoGroupColumnDef(): ColDef | undefined;
    getRowGroupPanelShow(): string | undefined;
    getPivotPanelShow(): string | undefined;
    isAngularCompileRows(): boolean;
    isAngularCompileFilters(): boolean;
    isDebug(): boolean;
    getColumnDefs(): (ColDef | ColGroupDef)[] | undefined;
    getColumnTypes(): {
        [key: string]: ColDef;
    } | undefined;
    getDatasource(): IDatasource | undefined;
    getViewportDatasource(): IViewportDatasource | undefined;
    getServerSideDatasource(): IServerSideDatasource | undefined;
    isAccentedSort(): boolean;
    isEnableBrowserTooltips(): boolean;
    isEnableCellExpressions(): boolean;
    isEnableGroupEdit(): boolean;
    isSuppressMiddleClickScrolls(): boolean;
    isPreventDefaultOnContextMenu(): boolean;
    isSuppressPreventDefaultOnMouseWheel(): boolean;
    isSuppressColumnVirtualisation(): boolean;
    isSuppressContextMenu(): boolean;
    isAllowContextMenuWithControlKey(): boolean;
    isSuppressCopyRowsToClipboard(): boolean;
    isCopyHeadersToClipboard(): boolean;
    isSuppressClipboardPaste(): boolean;
    isSuppressLastEmptyLineOnPaste(): boolean;
    isPagination(): boolean;
    isSuppressEnterpriseResetOnNewColumns(): boolean;
    getProcessDataFromClipboardFunc(): ((params: ProcessDataFromClipboardParams) => string[][] | null) | undefined;
    getAsyncTransactionWaitMillis(): number | undefined;
    isSuppressMovableColumns(): boolean;
    isAnimateRows(): boolean;
    isSuppressColumnMoveAnimation(): boolean;
    isSuppressAggFuncInHeader(): boolean;
    isSuppressAggAtRootLevel(): boolean;
    isSuppressAggFilteredOnly(): boolean;
    isShowOpenedGroup(): boolean;
    isEnableRangeSelection(): boolean;
    isEnableRangeHandle(): boolean;
    isEnableFillHandle(): boolean;
    getFillHandleDirection(): 'x' | 'y' | 'xy';
    getFillOperation(): ((params: FillOperationParams) => any) | undefined;
    isSuppressMultiRangeSelection(): boolean;
    isPaginationAutoPageSize(): boolean;
    isRememberGroupStateWhenNewData(): boolean;
    getIcons(): any;
    getAggFuncs(): {
        [key: string]: IAggFunc;
    } | undefined;
    getSortingOrder(): (string | null)[] | undefined;
    getAlignedGrids(): GridOptions[] | undefined;
    isMasterDetail(): boolean;
    isKeepDetailRows(): boolean;
    getKeepDetailRowsCount(): number | undefined;
    getIsRowMasterFunc(): IsRowMaster | undefined;
    getIsRowSelectableFunc(): IsRowSelectable | undefined;
    getGroupRowRendererParams(): any;
    getOverlayLoadingTemplate(): string | undefined;
    getOverlayNoRowsTemplate(): string | undefined;
    isSuppressAutoSize(): boolean;
    isEnableCellTextSelection(): boolean;
    isSuppressParentsInRowNodes(): boolean;
    isSuppressClipboardApi(): boolean;
    isFunctionsReadOnly(): boolean;
    isFloatingFilter(): boolean | undefined;
    isEnableCellTextSelect(): boolean;
    isEnableOldSetFilterModel(): boolean;
    getDefaultColDef(): ColDef | undefined;
    getDefaultColGroupDef(): ColGroupDef | undefined;
    getDefaultExportParams(): BaseExportParams | undefined;
    isSuppressCsvExport(): boolean;
    isAllowShowChangeAfterFilter(): boolean;
    isSuppressExcelExport(): boolean;
    isSuppressMakeColumnVisibleAfterUnGroup(): boolean;
    getDataPathFunc(): ((dataItem: any) => string[]) | undefined;
    getIsServerSideGroupFunc(): ((dataItem: any) => boolean) | undefined;
    getIsServerSideGroupOpenByDefaultFunc(): ((params: IsServerSideGroupOpenByDefaultParams) => boolean) | undefined;
    getServerSideGroupKeyFunc(): ((dataItem: any) => string) | undefined;
    getGroupRowAggNodesFunc(): ((nodes: RowNode[]) => any) | undefined;
    getContextMenuItemsFunc(): GetContextMenuItems | undefined;
    getMainMenuItemsFunc(): GetMainMenuItems | undefined;
    getRowNodeIdFunc(): GetRowNodeIdFunc | undefined;
    getNavigateToNextHeaderFunc(): ((params: NavigateToNextHeaderParams) => HeaderPosition) | undefined;
    getTabToNextHeaderFunc(): ((params: TabToNextHeaderParams) => HeaderPosition) | undefined;
    getNavigateToNextCellFunc(): ((params: NavigateToNextCellParams) => CellPosition) | undefined;
    getTabToNextCellFunc(): ((params: TabToNextCellParams) => CellPosition) | undefined;
    isTreeData(): boolean;
    isValueCache(): boolean;
    isValueCacheNeverExpires(): boolean;
    isDeltaSort(): boolean;
    isAggregateOnlyChangedColumns(): boolean;
    getProcessSecondaryColDefFunc(): ((colDef: ColDef) => void) | undefined;
    getProcessSecondaryColGroupDefFunc(): ((colGroupDef: ColGroupDef) => void) | undefined;
    getSendToClipboardFunc(): ((params: any) => void) | undefined;
    getProcessRowPostCreateFunc(): any;
    getProcessCellForClipboardFunc(): ((params: ProcessCellForExportParams) => any) | undefined;
    getProcessHeaderForClipboardFunc(): ((params: ProcessHeaderForExportParams) => any) | undefined;
    getProcessCellFromClipboardFunc(): ((params: ProcessCellForExportParams) => any) | undefined;
    getViewportRowModelPageSize(): number | undefined;
    getViewportRowModelBufferSize(): number;
    isServerSideSortingAlwaysResets(): boolean;
    isServerSideFilteringAlwaysResets(): boolean;
    getPostSortFunc(): ((rowNodes: RowNode[]) => void) | undefined;
    getChartToolbarItemsFunc(): GetChartToolbarItems | undefined;
    getChartThemeOverrides(): AgChartThemeOverrides | undefined;
    getCustomChartThemes(): {
        [name: string]: AgChartTheme;
    } | undefined;
    getChartThemes(): string[];
    getProcessChartOptionsFunc(): ((params: ProcessChartOptionsParams) => ChartOptions<any>) | undefined;
    getClipboardDeliminator(): string;
    setProperty(key: string, value: any, force?: boolean): void;
    addLayoutElement(element: HTMLElement): void;
    private updateLayoutClasses;
    addEventListener(key: string, listener: Function): void;
    removeEventListener(key: string, listener: Function): void;
    isSkipHeaderOnAutoSize(): boolean;
    getAutoSizePadding(): number;
    getHeaderHeight(): number | null | undefined;
    getFloatingFiltersHeight(): number | null | undefined;
    getGroupHeaderHeight(): number | null | undefined;
    getPivotHeaderHeight(): number | null | undefined;
    getPivotGroupHeaderHeight(): number | null | undefined;
    isExternalFilterPresent(): boolean;
    doesExternalFilterPass(node: RowNode): boolean;
    getTooltipShowDelay(): number | null;
    isTooltipMouseTrack(): boolean;
    getDocument(): Document;
    getMinColWidth(): number | undefined;
    getMaxColWidth(): number | null;
    getColWidth(): number;
    getRowBuffer(): number;
    getRowBufferInPixels(): number;
    getScrollbarWidth(): number;
    private checkForDeprecated;
    private checkForViolations;
    private treeDataViolations;
    getLocaleTextFunc(): (key: string, defaultValue: string) => string;
    globalEventHandler(eventName: string, event?: any): void;
    getRowHeightAsNumber(): number;
    getRowHeightForNode(rowNode: RowNode, allowEstimate?: boolean): {
        height: number | null | undefined;
        estimated: boolean;
    };
    isDynamicRowHeight(): boolean;
    getListItemHeight(): number;
    chartMenuPanelWidth(): number | undefined;
    private isNumeric;
    private getFromTheme;
    private getDefaultRowHeight;
}