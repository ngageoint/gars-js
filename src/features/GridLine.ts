import { Line, Point } from "@ngageoint/grid-js";

/**
 * Line between two points
 * 
 * @author osbornb
 */
export class GridLine extends Line {

    /**
     * Serial Version UID
     */
    private static readonly serialVersionUID = 1;

    /**
     * Grid type the line represents if any
     */
    private gridType: GridType;

    /**
     * Create a line
     * 
     * @param point1
     *            first point
     * @param point2
     *            second point
     * @param gridType
     *            line grid type (optional)
     * @return line
     */
    public static line(point1: Point, point2: Point, gridType?: GridType): GridLine {
        return new GridLine(point1, point2, gridType);
    }

    /**
     * Create a line
     * 
     * @param line
     *            line to copy
     * @param gridType
     *            line grid type (optional)
     * @return line
     */
    public static lineFromLine(line: Line, gridType?: GridType): GridLine {
        return new GridLine(line, gridType);
    }

    /**
     * Copy a line
     * 
     * @param line
     *            line to copy
     * @return line
     */
    public static lineFromGridLine(line: GridLine): GridLine {
        return new GridLine(line);
    }

    /**
     * Constructor
     * 
     * @param point1
     *            first point
     * @param point2
     *            second point
     */
    constructor(Point point1, Point point2) {
        super(point1, point2);
    }

    /**
     * Constructor
     * 
     * @param point1
     *            first point
     * @param point2
     *            second point
     * @param gridType
     *            line grid type
     */
    constructor(Point point1, Point point2, GridType gridType) {
        this(point1, point2);
        this.gridType = gridType;
    }

    /**
     * Constructor
     * 
     * @param line
     *            line to copy
     */
    constructor(Line line) {
        super(line);
    }

    /**
     * Constructor
     * 
     * @param line
     *            line to copy
     * @param gridType
     *            line grid type
     */
    constructor(Line line, GridType gridType) {
        this(line);
        this.gridType = gridType;
    }

    /**
     * Copy Constructor
     * 
     * @param line
     *            line to copy
     */
    constructor(GridLine line) {
        this(line, line.getGridType());
    }

    /**
     * Get the line grid type
     * 
     * @return grid type
     */
    public getGridType(): GridType {
        return this.gridType;
    }

    /**
     * Check if the line has a grid type
     * 
     * @return true if has grid type
     */
    public hasGridType(): boolean {
        return this.gridType !== null;
    }

    /**
     * Set the line grid type
     * 
     * @param gridType
     *            grid type
     */
    public setGridType(gridType: GridType): void {
        this.gridType = gridType;
    }

    /**
     * Copy the line
     * 
     * @return line copy
     */
    public copy(): GridLine {
        return new GridLine(this);
    }

    /**
     * {@inheritDoc}
     */
    public equals(obj: any): boolean {
        if (this === obj)
            return true;
        if (!super.equals(obj as any))
            return false;
        if (typeof this !== typeof obj)
            return false;
        const other = obj as GridLine;
        if (this.gridType !== other.gridType)
            return false;
        return true;
    }

}
