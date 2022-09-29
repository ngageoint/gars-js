import { Color } from '@ngageoint/color-js';
import { BaseGrid, Bounds, GridStyle, GridTile, Point, PropertyConstants } from '@ngageoint/grid-js';
import { Comparable } from '@ngageoint/simple-features-js';
import { GridLine } from '../features/GridLine';
import { GARSUtils } from '../GARSUtils';
import { GARSProperties } from '../property/GARSProperties';
import { GridLabel } from './GridLabel';
import { GridLabeler } from './GridLabeler';
import { GridType } from './GridType';
import { GridTypeUtils } from './GridTypeUtils';

/**
 * Grid
 *
 * @author osbornb
 */
export class Grid extends BaseGrid implements Comparable<Grid> {
  /**
   * Default line width
   */
  public static readonly DEFAULT_WIDTH = GARSProperties.getInstance().getDoubleProperty(
    true,
    PropertyConstants.GRID.toString(),
    PropertyConstants.WIDTH.toString(),
  );

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
    return this.type === type;
  }

  /**
   * Get the precision in degrees
   *
   * @return precision degrees
   */
  public getPrecision(): number {
    return this.type;
  }

  /**
   * Get the grid type precision line style for the grid type
   *
   * @param gridType
   *            grid type
   * @return grid type line style
   */
  public getStyle(gridType?: GridType): GridStyle | undefined {
    let style: GridStyle | undefined;
    if (gridType) {
      if (gridType === this.type) {
        style = super.getStyle();
      } else {
        style = this.styles.get(gridType);
      }
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
      style = new GridStyle(undefined, 0);
      this.setStyle(style, gridType);
    }
    return style!;
  }

  /**
   * Set the grid type precision line style
   *
   * @param gridType
   *            grid type
   * @param style
   *            grid line style
   */
  public setStyle(style: GridStyle, gridType?: GridType): void {
    if (gridType) {
      if (gridType < this.getPrecision()) {
        throw new Error(
          'Grid can not define a style for a higher precision grid type. Type: ' +
            this.type +
            ', Style Type: ' +
            gridType,
        );
      }
      if (gridType === this.type) {
        super.setStyle(style);
      } else {
        this.styles.set(gridType, style != null ? style : new GridStyle(undefined, 0));
      }
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
  public getColor(gridType?: GridType): Color | undefined {
    let color: Color | undefined;
    if (gridType) {
      const style = this.getStyle(gridType);
      if (style) {
        color = style.getColor();
      }
      if (!color) {
        color = super.getColor();
      }
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
  public setColor(color?: Color, gridType?: GridType): void {
    if (gridType) {
      this.getOrCreateStyle(gridType).setColor(color);
    }
  }

  /**
   * Get the grid type precision line width
   *
   * @param gridType
   *            grid type
   * @return grid type line width
   */
  public getWidth(gridType?: GridType): number {
    let width = 0;
    const style = this.getStyle(gridType);
    if (style) {
      width = style.getWidth();
    }
    if (width === 0) {
      width = super.getWidth();
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
  public setWidth(width: number, gridType?: GridType): void {
    if (gridType) {
      this.getOrCreateStyle(gridType).setWidth(width);
    }
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
  public getLinesFromGridTile(tile: GridTile): GridLine[] | undefined {
    return this.getLines(tile.getZoom(), tile.getBounds()!);
  }

  /**
   * Get the lines for the tile bounds
   *
   * @param zoom
   *            zoom level
   * @param tileBounds
   *            tile bounds
   * @return lines
   */
  public getLines(zoom: number, tileBounds: Bounds): GridLine[] | undefined {
    const lines: GridLine[] = [];

    if (!this.isLinesWithin(zoom)) {
      return undefined;
    }

    const precision = this.getPrecision();

    tileBounds = tileBounds.toPrecision(precision);

    for (
      let lon = tileBounds.getMinLongitude();
      lon <= tileBounds.getMaxLongitude();
      lon = GARSUtils.nextPrecision(lon, precision)
    ) {
      const verticalPrecision = GridTypeUtils.getPrecision(lon);

      for (
        let lat = tileBounds.getMinLatitude();
        lat <= tileBounds.getMaxLatitude();
        lat = GARSUtils.nextPrecision(lat, precision)
      ) {
        const horizontalPrecision = GridTypeUtils.getPrecision(lat);

        const southwest = Point.point(lon, lat);
        const northwest = Point.point(lon, lat + precision);
        const southeast = Point.point(lon + precision, lat);

        // Vertical line
        lines.push(GridLine.line(southwest, northwest, verticalPrecision));

        // Horizontal line
        lines.push(GridLine.line(southwest, southeast, horizontalPrecision));
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
  public getLabelsFromGridTile(tile: GridTile): GridLabel[] | undefined {
    return this.getLabels(tile.getZoom(), tile.getBounds()!);
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
  public getLabels(zoom: number, tileBounds: Bounds): GridLabel[] | undefined {
    let labels: GridLabel[] | undefined;
    if (this.isLabelerWithin(zoom)) {
      labels = this.getLabeler().getLabels(tileBounds, this.type);
    }
    return labels;
  }

  /**
   * {@inheritDoc}
   */
  public compareTo(other: Grid): number {
    const d1 = this.getPrecision();
    const d2 = other.getPrecision();

    if (d1 < d2) return -1; // Neither val is NaN, thisVal is smaller
    if (d1 > d2) return 1; // Neither val is NaN, thisVal is larger

    return d1 === d2
      ? 0 // Values are equal
      : d1 < d2
      ? -1 // (-0.0, 0.0) or (!NaN, NaN)
      : 1; // (0.0, -0.0) or (NaN, !NaN)
  }

  /**
   * {@inheritDoc}
   */
  public equals(obj: any): boolean {
    if (this === obj) return true;
    if (obj === null) return false;
    if (typeof this !== typeof obj) return false;
    const other = obj as Grid;
    if (this.type !== other.type) return false;
    return true;
  }
}
