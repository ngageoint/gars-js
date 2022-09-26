import { Color } from "@ngageoint/color-js";
import { BaseGrid, Bounds, GridStyle, GridTile, Point, PropertyConstants } from "@ngageoint/grid-js";
import { GridLine } from "../features/GridLine";

/**
 * Grid
 * 
 * @author osbornb
 */
export class Grid extends BaseGrid implements Comparable<Grid> {

    /**
     * Default line width
     */
    public static readonly DEFAULT_WIDTH = GARSProperties.getInstance()
        .getDoubleProperty(PropertyConstants.GRID, PropertyConstants.WIDTH);

    /**
     * Grid type
     */
    private readonly type: GridType;

    /**
     * Grid line styles
     */
    private styles = new Map<GridType, GridStyle>();

    /**
     * Constructor
     * 
     * @param type
     *            grid type
     */
    constructor(type: GridType) {
        super();
        this.type = type;
    }

    /**
     * Get the grid type
     * 
     * @return grid type
     */
    public getType(): GridType {
        return this.type;
    }

    /**
     * Is the provided grid type
     * 
     * @param type
     *            grid type
     * @return true if the type
     */
    public isType(type: GridType): boolean {
        return this.type == type;
    }

    /**
     * Get the precision in degrees
     * 
     * @return precision degrees
     */
    public getPrecision(): number {
        return this.type.getPrecision();
    }

    /**
     * Get the grid type precision line style for the grid type
     * 
     * @param gridType
     *            grid type
     * @return grid type line style
     */
    public getStyle(gridType: GridType): GridStyle {
        let style: GridStyle | null = null;
        if (gridType === this.type) {
            style = this.getStyle();
        } else {
            style = this.styles.get(gridType);
        }
        return style;
    }

    /**
     * Get the grid type line style for the grid type or create it
     * 
     * @param gridType
     *            grid type
     * @return grid type line style
     */
    private getOrCreateStyle(gridType: GridType): GridStyle {
        let style = this.getStyle(gridType);
        if (style === null) {
            style = new GridStyle();
            this.setStyle(gridType, style);
        }
        return style;
    }

    /**
     * Set the grid type precision line style
     * 
     * @param gridType
     *            grid type
     * @param style
     *            grid line style
     */
    public setStyle(gridType: GridType, style: GridStyle): void {
        if (gridType.getPrecision() < this.getPrecision()) {
            throw new Error(
                "Grid can not define a style for a higher precision grid type. Type: "
                + this.type + ", Style Type: " + gridType);
        }
        if (gridType === this.type) {
            this.setStyle(style);
        } else {
            this.styles.set(gridType, style != null ? style : new GridStyle());
        }
    }

    /**
     * Clear the propagated grid type precision styles
     */
    public clearPrecisionStyles(): void {
        this.styles.clear();
    }

    /**
     * Get the grid type precision line color
     * 
     * @param gridType
     *            grid type
     * @return grid type line color
     */
    public getColor(gridType: GridType): Color | undefined {
        let color: Color | undefined;
        let style = this.getStyle(gridType);
        if (style !== null) {
            color = style.getColor();
        }
        if (color === null) {
            color = super.getColor();
        }
        return color;
    }

    /**
     * Set the grid type precision line color
     * 
     * @param gridType
     *            grid type
     * @param color
     *            grid line color
     */
    public setColor(gridType: GridType, color: Color): void {
        this.getOrCreateStyle(gridType).setColor(color);
    }

    /**
     * Get the grid type precision line width
     * 
     * @param gridType
     *            grid type
     * @return grid type line width
     */
    public getWidth(gridType: GridType): number {
        let width = 0;
        let style = this.getStyle(gridType);
        if (style !== null) {
            width = style.getWidth();
        }
        if (width === 0) {
            width = this.getWidth();
        }
        return width;
    }

    /**
     * Set the grid type precision line width
     * 
     * @param gridType
     *            grid type
     * @param width
     *            grid line width
     */
    public setWidth(gridType: GridType, width: number): void {
        this.getOrCreateStyle(gridType).setWidth(width);
    }

    /**
     * Get the grid labeler
     * 
     * @return grid labeler
     */
    public getLabeler(): GridLabeler {
        return super.getLabeler() as GridLabeler;
    }

    /**
     * Set the grid labeler
     * 
     * @param labeler
     *            grid labeler
     */
    public setLabeler(labeler: GridLabeler): void {
        super.setLabeler(labeler);
    }

    /**
     * Get the lines for the tile
     * 
     * @param tile
     *            tile
     * @return lines
     */
    public getLines(tile: GridTile): GridLine[] {
        return this.getLines(tile.getZoom(), tile.getBounds());
    }

    /**
     * Get the lines for the zoom and tile bounds
     * 
     * @param zoom
     *            zoom level
     * @param tileBounds
     *            tile bounds
     * @return lines
     */
    public getLines(zoom: number, tileBounds: Bounds): GridLine[] | null {
        let lines: GridLine[] | null = null;
        if (this.isLinesWithin(zoom)) {
            lines = this.getLines(tileBounds);
        }
        return lines;
    }

    /**
     * Get the lines for the tile bounds
     * 
     * @param tileBounds
     *            tile bounds
     * @return lines
     */
    public getLines(tileBounds: Bounds): GridLine[] {

        const lines: GridLine[] = []];

        const precision = this.getPrecision();

        tileBounds = tileBounds.toPrecision(precision);

        for (let lon = tileBounds.getMinLongitude(); lon <= tileBounds
            .getMaxLongitude(); lon = GARSUtils.nextPrecision(lon,
                precision)) {

            const verticalPrecision = GridType.getPrecision(lon);

            for (let lat = tileBounds.getMinLatitude(); lat <= tileBounds
                .getMaxLatitude(); lat = GARSUtils.nextPrecision(lat,
                    precision)) {

                const horizontalPrecision = GridType.getPrecision(lat);

                const southwest = Point.point(lon, lat);
                const northwest = Point.point(lon, lat + precision);
                const southeast = Point.point(lon + precision, lat);

                // Vertical line
                lines.push(
                    GridLine.line(southwest, northwest, verticalPrecision));

                // Horizontal line
                lines.push(GridLine.line(southwest, southeast,
                    horizontalPrecision));

            }
        }

        return lines;
    }

    /**
     * Get the labels for the tile
     * 
     * @param tile
     *            tile
     * @return labels
     */
    public getLabels(tile: GridTile): GridLabel[] {
        return this.getLabels(tile.getZoom(), tile.getBounds());
    }

    /**
     * Get the labels for the zoom and tile bounds
     * 
     * @param zoom
     *            zoom level
     * @param tileBounds
     *            tile bounds
     * @return labels
     */
    public getLabels(zoom: number, tileBounds: Bounds): GridLabel[] {
        let labels: GridLabel[] | null = null;
        if (this.isLabelerWithin(zoom)) {
            labels = this.getLabeler().getLabels(tileBounds, this.type);
        }
        return labels;
    }

    /**
     * {@inheritDoc}
     */
    public compareTo(other: Grid): number {
        return Double.compare(this.getPrecision(), other.getPrecision());
    }

    /**
     * {@inheritDoc}
     */
    public equals(obj: any): boolean {
        if (this === obj)
            return true;
        if (obj === null)
            return false;
        if (typeof this !== typeof obj)
            return false;
		const other = obj as Grid;
        if (this.type !== other.type)
            return false;
        return true;
    }

}
