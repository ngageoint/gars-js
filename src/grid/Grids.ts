import { Color } from "@ngageoint/color-js";
import { GridStyle, PropertyConstants } from "@ngageoint/grid-js";
import { GARSProperties } from "../property/GARSProperties";
import { GARSLabeler } from "./GARSLabeler";
import { Grid } from "./Grid";
import { GridLabeler } from "./GridLabeler";
import { GridType } from "./GridType";
import { ZoomGrids } from "./ZoomGrids";

/**
 * Grids
 * 
 * @author osbornb
 */
export class Grids extends BaseGrids<Grid, ZoomGrids> {

    /**
     * Grids
     */
    private grids = new Map<GridType, Grid>;

    /**
     * Create with all grid types enabled
     * 
     * @return grids
     */
    public static create(): Grids {
        return new Grids();
    }

    /**
     * Create with grids to enable
     * 
     * @param types
     *            grid types to enable
     * @return grids
     */
    public static create(types: GridType[]): Grids {
        return new Grids(types);
    }

    /**
     * Constructor
     * 
     * @param types
     *            grid types to enable
     */
    constructor(types?: GridType[]) {
        super(GARSProperties.getInstance());

        // createGrids();
        this.createGrids(false);

        for (const type in types) {
            this.getGrid(type).setEnabled(true);
        }

        this.createZoomGrids();
    }

    /**
     * {@inheritDoc}
     */
    public getDefaultWidth(): number {
        return Grid.DEFAULT_WIDTH;
    }

    /**
     * {@inheritDoc}
     */
    public grids(): IterableIterator<Grid> {
        return this.grids.values();
    }

    /**
     * Create a new grid, override to create a specialized grid
     * 
     * @param type
     *            grid type
     * @return grid
     */
    protected newGrid(type: GridType): Grid {
        return new Grid(type);
    }

    /**
     * {@inheritDoc}
     */
    protected newZoomGrids(zoom: number): ZoomGrids {
        return new ZoomGrids(zoom);
    }

    /**
     * Create the grids
     * 
     * @param enabled
     *            enable created grids
     */
    private createGrids(enabled?: boolean): void {

        const propagate = this.properties.getBooleanProperty(false,
            PropertyConstants.GRIDS, PropertyConstants.PROPAGATE);
        let styles: Map<GridType, GridStyle> | null = null;
        if (propagate != null && propagate) {
            styles = new  Map<GridType, GridStyle>();
        }

        this.createGrid(GridType.TWENTY_DEGREE, styles, enabled, new GARSLabeler());
        this.createGrid(GridType.TEN_DEGREE, styles, enabled, new GARSLabeler());
        this.createGrid(GridType.FIVE_DEGREE, styles, enabled, new GARSLabeler());
        this.createGrid(GridType.ONE_DEGREE, styles, enabled, new GARSLabeler());
        this.createGrid(GridType.THIRTY_MINUTE, styles, enabled, new GARSLabeler());
        this.createGrid(GridType.FIFTEEN_MINUTE, styles, enabled, new GARSLabeler());
        this.createGrid(GridType.FIVE_MINUTE, styles, enabled, new GARSLabeler());

    }

    /**
     * Create the grid
     * 
     * @param type
     *            grid type
     * @param styles
     *            propagate grid styles
     * @param enabled
     *            enable created grids
     * @param labeler
     *            grid labeler
     */
    private createGrid(type: GridType, styles: Map<GridType, GridStyle>,
        enabled: boolean, labeler: GridLabeler): void {

        const grid = this.newGrid(type);

        const gridKey = type.name().toLowerCase();

        this.loadGrid(grid, gridKey, enabled, labeler);

        if (styles != null) {
            styles.set(type, GridStyle.style(grid.getColor(), grid.getWidth()));
        }

        this.loadGridStyles(grid, styles, gridKey);

        this.grids.set(type, grid);
    }

    /**
     * Load grid styles within a higher precision grid
     * 
     * @param grid
     *            grid
     * @param styles
     *            propagate grid styles
     * @param gridKey
     *            grid key
     */
    private loadGridStyles(grid: Grid, styles: Map<GridType, GridStyle>,
        gridKey: string): void {
        const precision = grid.getPrecision();
        if (precision < GridType.TWENTY_DEGREE) {
            this.loadGridStyle(grid, styles, gridKey, GridType.TWENTY_DEGREE);
        }
        if (precision < GridType.TEN_DEGREE) {
            this.loadGridStyle(grid, styles, gridKey, GridType.TEN_DEGREE);
        }
        if (precision < GridType.FIVE_DEGREE) {
            this.loadGridStyle(grid, styles, gridKey, GridType.FIVE_DEGREE);
        }
        if (precision < GridType.ONE_DEGREE) {
            this.loadGridStyle(grid, styles, gridKey, GridType.ONE_DEGREE);
        }
        if (precision < GridType.THIRTY_MINUTE) {
            this.loadGridStyle(grid, styles, gridKey, GridType.THIRTY_MINUTE);
        }
        if (precision < GridType.FIFTEEN_MINUTE) {
            this.loadGridStyle(grid, styles, gridKey, GridType.FIFTEEN_MINUTE);
        }
    }

    /**
     * Load a grid style within a higher precision grid
     * 
     * @param grid
     *            grid
     * @param styles
     *            propagate grid styles
     * @param gridKey
     *            grid key
     * @param gridType
     *            style grid type
     */
    private loadGridStyle(grid: Grid, styles: Map<GridType, GridStyle>,
        gridKey: string, gridType: GridType): void {

        const gridKey2 = gridType.name().toLowerCase();

        let color = this.loadGridStyleColor(gridKey, gridKey2);
        let width = this.loadGridStyleWidth(gridKey, gridKey2);

        if ((!color || !width) && styles) {
            const style = styles.get(gridType);
            if (style) {
                if (color === null) {
                    const styleColor = style.getColor();
                    if (styleColor) {
                        color = styleColor.copy();
                    }
                }
                if (width === null) {
                    width = style.getWidth();
                }
            }
        }

        if (color  || width) {

            const style = this.getGridStyle(color, width, grid);
            grid.setStyle(gridType, style);

            if (styles) {
                styles.set(gridType, style);
            }
        }

    }

    /**
     * Get the grid
     * 
     * @param type
     *            grid type
     * @return grid
     */
    public getGrid(type: GridType): Grid | undefined {
        return this.grids.get(type);
    }

    /**
     * Get the grid precision for the zoom level
     * 
     * @param zoom
     *            zoom level
     * @return grid type precision
     */
    public getPrecision(zoom: number): GridType {
        return this.getGrids(zoom).getPrecision();
    }

    /**
     * Set the active grid types
     * 
     * @param types
     *            grid types
     */
    public setGrids(types: GridType[]): void {
        this.setGridTypes(types);
    }

    /**
     * Set the active grids
     * 
     * @param grids
     *            grids
     */
    public setGrids(grids: Grid[]): void {
        this.setGrids(grids);
    }

    /**
     * Set the active grid types
     * 
     * @param types
     *            grid types
     */
    public setGridTypes(types: GridType[]): void {
        const disableTypes = new Set<GridType>(GridType.values());
        for (const gridType in types) {
            this.enable(gridType);
            disableTypes.remove(gridType);
        }
        this.disableTypes(disableTypes);
    }

    /**
     * Set the active grids
     * 
     * @param grids
     *            grids
     */
    public setGrids(grids: Grid[]): void {
        const disableTypes = new Set<GridType>(GridType.values());
        for (const grid in grids) {
            this.enable(grid);
            disableTypes.delete(grid.getType());
        }
        this.disableTypes(disableTypes);
    }

    /**
     * Enable grid types
     * 
     * @param types
     *            grid types
     */
    public enableTypes(types: GridType[]): void {
        for (const type in types) {
            this.enable(type);
        }
    }

    /**
     * Disable grid types
     * 
     * @param types
     *            grid types
     */
    public disableTypes(types: GridType[]): void {
        for (const type in types) {
            this.disable(type);
        }
    }

    /**
     * Is the grid type enabled
     * 
     * @param type
     *            grid type
     * @return true if enabled
     */
    public isEnabled(type: GridType): boolean {
        return this.getGrid(type)!.isEnabled();
    }

    /**
     * Enable the grid type
     * 
     * @param type
     *            grid type
     */
    public enable(type: GridType): void {
        this.enable(this.getGrid(type));
    }

    /**
     * Disable the grid type
     * 
     * @param type
     *            grid type
     */
    public disable(type: GridType): void {
        this.disable(this.getGrid(type));
    }

    /**
     * Set the grid minimum zoom
     * 
     * @param type
     *            grid type
     * @param minZoom
     *            minimum zoom
     */
    public setMinZoom(type: GridType, minZoom: number): void {
        this.setMinZoom(this.getGrid(type), minZoom);
    }

    /**
     * Set the grid maximum zoom
     * 
     * @param type
     *            grid type
     * @param maxZoom
     *            maximum zoom
     */
    public setMaxZoom(type: GridType, maxZoom: number): void {
        this.setMaxZoom(this.getGrid(type), maxZoom);
    }

    /**
     * Set the grid zoom range
     * 
     * @param type
     *            grid type
     * @param minZoom
     *            minimum zoom
     * @param maxZoom
     *            maximum zoom
     */
    public setZoomRange(type: GridType, minZoom: number, maxZoom: number): void {
        this.setZoomRange(this.getGrid(type), minZoom, maxZoom);
    }

    /**
     * Set the grid minimum level override for drawing grid lines
     * 
     * @param type
     *            grid type
     * @param minZoom
     *            minimum zoom level or null to remove
     */
    public setLinesMinZoom(type: GridType, minZoom: number): void {
        this.getGrid(type)!.setLinesMinZoom(minZoom);
    }

    /**
     * Set the grid maximum level override for drawing grid lines
     * 
     * @param type
     *            grid type
     * @param maxZoom
     *            maximum zoom level or null to remove
     */
    public setLinesMaxZoom(type: GridType, maxZoom?: number): void {
        this.getGrid(type)!.setLinesMaxZoom(maxZoom);
    }

    /**
     * Set all grid line colors
     * 
     * @param color
     *            grid line color
     */
    public setAllColors(color: Color): void {
        this.setColor(color, GridType.values());
    }

    /**
     * Set the grid line color for the grid types
     * 
     * @param color
     *            grid line color
     * @param types
     *            grid types
     */
    public setColor(color: Color, types: GridType[]): void {
        for (const type of types) {
            this.setColor(type, color);
        }
    }

    /**
     * Set the grid line color for the grid type
     * 
     * @param type
     *            grid type
     * @param color
     *            grid line color
     */
    public setColor(type: GridType, color: Color): void {
        this.getGrid(type)!.setColor(color);
    }

    /**
     * Set all grid line widths
     * 
     * @param width
     *            grid line width
     */
    public setAllWidths(width: number): void {
        this.setWidth(width, GridType.values());
    }

    /**
     * Set the grid line width for the grid types
     * 
     * @param width
     *            grid line width
     * @param types
     *            grid types
     */
    public setWidth(width: number, types: GridType[]): void {
        for (const type of types) {
            this.setWidth(type, width);
        }
    }

    /**
     * Set the grid line width for the grid type
     * 
     * @param type
     *            grid type
     * @param width
     *            grid line width
     */
    public setWidth(type: GridType, width: number): void {
        this.getGrid(type)!.setWidth(width);
    }

    /**
     * Delete propagated styles
     */
    public deletePropagatedStyles(): void {
        this.deletePropagatedStyles(GridType.values());
    }

    /**
     * Delete propagated styles for the grid types
     * 
     * @param types
     *            grid types
     */
    public deletePropagatedStyles(types: GridType[]): void {
        for (const type of types) {
            this.deletePropagatedStyles(type);
        }
    }

    /**
     * Delete propagated styles for the grid type
     * 
     * @param type
     *            grid type
     */
    public deletePropagatedStyles(type: GridType): void {
        this.getGrid(type)!.clearPrecisionStyles();
    }

    /**
     * Set the grid type precision line color for the grid types
     * 
     * @param types
     *            grid types
     * @param precisionType
     *            precision grid type
     * @param color
     *            grid line color
     */
    public setColor(types: GridType[], precisionType: GridType,
        color: Color): void {
        for (const type of types) {
            this.setColor(type, precisionType, color);
        }
    }

    /**
     * Set the grid type precision line colors for the grid type
     * 
     * @param type
     *            grid type
     * @param color
     *            grid line color
     * @param precisionTypes
     *            precision grid types
     */
    public setColor(type: GridType, color: Color,
        precisionTypes: GridType[]): void {
        for (const precisionType of precisionTypes) {
            this.setColor(type, precisionType, color);
        }
    }

    /**
     * Set the grid type precision line color for the grid type
     * 
     * @param type
     *            grid type
     * @param precisionType
     *            precision grid type
     * @param color
     *            grid line color
     */
    public setColor(type: GridType, precisionType: GridType, color: Color): void {
        this.getGrid(type)!.setColor(precisionType, color);
    }

    /**
     * Set the grid type precision line width for the grid types
     * 
     * @param types
     *            grid types
     * @param precisionType
     *            precision grid type
     * @param width
     *            grid line width
     */
    public setWidth(types: GridType[], precisionType: GridType,
        width: number): void {
        for (const type of types) {
            this.setWidth(type, precisionType, width);
        }
    }

    /**
     * Set the grid type precision line widths for the grid type
     * 
     * @param type
     *            grid type
     * @param width
     *            grid line width
     * @param precisionTypes
     *            precision grid types
     */
    public setWidth(type: GridType, width: number,
        precisionTypes: GridType[]): void {
        for (const precisionType of precisionTypes) {
            this.setWidth(type, precisionType, width);
        }
    }

    /**
     * Set the grid type precision line width for the grid type
     * 
     * @param type
     *            grid type
     * @param precisionType
     *            precision grid type
     * @param width
     *            grid line width
     */
    public setWidth(type: GridType, precisionType: GridType, width: number): void {
        this.getGrid(type)!.setWidth(precisionType, width);
    }

    /**
     * Get the labeler for the grid type
     * 
     * @param type
     *            grid type
     * @return labeler or null
     */
    public getLabeler(type: GridType): GridLabeler {
        return this.getGrid(type)!.getLabeler();
    }

    /**
     * Has a labeler for the grid type
     * 
     * @param type
     *            grid type
     * @return true if has labeler
     */
    public hasLabeler(type: GridType): boolean {
        return this.getGrid(type)!.hasLabeler();
    }

    /**
     * Set the labeler for the grid type
     * 
     * @param type
     *            grid type
     * @param labeler
     *            labeler
     */
    public setLabeler(type: GridType, labeler: GridLabeler): void {
        this.getGrid(type)!.setLabeler(labeler);
    }

    /**
     * Disable all grid labelers
     */
    public disableAllLabelers(): void {
        this.disableLabelers(GridType.values());
    }

    /**
     * Enable the labelers for the grid types
     * 
     * @param types
     *            grid types
     */
    public enableLabelers(types: GridType[]): void {
        for (const type of types) {
            this.enableLabeler(type);
        }
    }

    /**
     * Disable the labelers for the grid types
     * 
     * @param types
     *            grid types
     */
    public disableLabelers(types: GridType[]): void {
        for (const type of types) {
            this.disableLabeler(type);
        }
    }

    /**
     * Is a labeler enabled for the grid type
     * 
     * @param type
     *            grid type
     * @return true if labeler enabled
     */
    public isLabelerEnabled(type: GridType): boolean {
        const labeler = this.getLabeler(type);
        return labeler !== null && labeler.isEnabled();
    }

    /**
     * Enable the grid type labeler
     * 
     * @param type
     *            grid type
     */
    public enableLabeler(type: GridType): void {
        this.getRequiredLabeler(type).setEnabled(true);
    }

    /**
     * Disable the grid type labeler
     * 
     * @param type
     *            grid type
     */
    public disableLabeler(type: GridType): void {
        const labeler = this.getLabeler(type);
        if (labeler) {
            labeler.setEnabled(false);
        }
    }

    /**
     * Get the labeler for the grid type
     * 
     * @param type
     *            grid type
     * @return labeler or null
     */
    private getRequiredLabeler(type: GridType): GridLabeler {
        const labeler = this.getLabeler(type);
        if (!labeler) {
            throw new Error(
                "Grid type does not have a labeler: " + type);
        }
        return labeler;
    }

    /**
     * Set the grid minimum zoom
     * 
     * @param type
     *            grid type
     * @param minZoom
     *            minimum zoom
     */
    public setLabelMinZoom(type: GridType, minZoom: number): void {
        const labeler = this.getRequiredLabeler(type);
        labeler.setMinZoom(minZoom);
        const maxZoom = labeler.getMaxZoom();
        if (maxZoom && maxZoom < minZoom) {
            labeler.setMaxZoom(minZoom);
        }
    }

    /**
     * Set the grid maximum zoom
     * 
     * @param type
     *            grid type
     * @param maxZoom
     *            maximum zoom
     */
    public setLabelMaxZoom(type: GridType, maxZoom: number): void {
        const labeler = this.getRequiredLabeler(type);
        labeler.setMaxZoom(maxZoom);
        if (maxZoom && labeler.getMinZoom() > maxZoom) {
            labeler.setMinZoom(maxZoom);
        }
    }

    /**
     * Set the grid zoom range
     * 
     * @param type
     *            grid type
     * @param minZoom
     *            minimum zoom
     * @param maxZoom
     *            maximum zoom
     */
    public setLabelZoomRange(type: GridType, minZoom: number, maxZoom: number): void {
        const labeler = this.getRequiredLabeler(type);
        if (maxZoom && maxZoom < minZoom) {
            throw new Error("Min zoom '" + minZoom
                + "' can not be larger than max zoom '" + maxZoom + "'");
        }
        labeler.setMinZoom(minZoom);
        labeler.setMaxZoom(maxZoom);
    }

    /**
     * Set the label grid edge buffer for the grid types
     * 
     * @param buffer
     *            label buffer (greater than or equal to 0.0 and less than 0.5)
     * @param types
     *            grid types
     */
    public setLabelBuffer(buffer: number, types: GridType[]): void {
        for (const type of types) {
            this.setLabelBuffer(type, buffer);
        }
    }

    /**
     * Get the label grid edge buffer
     * 
     * @param type
     *            grid type
     * @return label buffer (greater than or equal to 0.0 and less than 0.5)
     */
    public getLabelBuffer(type: GridType): number {
        return this.getGrid(type)!.getLabelBuffer();
    }

    /**
     * Set the label grid edge buffer
     * 
     * @param type
     *            grid type
     * @param buffer
     *            label buffer (greater than or equal to 0.0 and less than 0.5)
     */
    public setLabelBuffer(type: GridType, buffer: number): void {
        this.getRequiredLabeler(type).setBuffer(buffer);
    }

    /**
     * Set all label colors
     * 
     * @param color
     *            label color
     */
    public setAllLabelColors(color: Color): void {
        for (const grid of this.grids.values()) {
            if (grid.hasLabeler()) {
                this.setLabelColor(grid.getType(), color);
            }
        }
    }

    /**
     * Set the label color for the grid types
     * 
     * @param color
     *            label color
     * @param types
     *            grid types
     */
    public setLabelColor(color: Color, types: GridType[]): void {
        for (const type of types) {
            this.setLabelColor(type, color);
        }
    }

    /**
     * Set the label color
     * 
     * @param type
     *            grid type
     * @param color
     *            label color
     */
    public setLabelColor(type: GridType, color: Color): void {
        this.getRequiredLabeler(type).setColor(color);
    }

    /**
     * Set all label text sizes
     * 
     * @param textSize
     *            label text size
     */
    public setAllLabelTextSizes(textSize: number): void {
        for (const grid of this.grids.values()) {
            if (grid.hasLabeler()) {
                this.setLabelTextSize(grid.getType(), textSize);
            }
        }
    }

    /**
     * Set the label text size for the grid types
     * 
     * @param textSize
     *            label text size
     * @param types
     *            grid types
     */
    public setLabelTextSize(textSize: number, types: GridType[]): void {
        for (const type of types) {
            this.setLabelTextSize(type, textSize);
        }
    }

    /**
     * Set the label text size
     * 
     * @param type
     *            grid type
     * @param textSize
     *            label text size
     */
    public setLabelTextSize(type: GridType, textSize: number): void {
        this.getRequiredLabeler(type).setTextSize(textSize);
    }

}
