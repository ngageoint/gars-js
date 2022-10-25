import { Bounds, Label, Point } from '@ngageoint/grid-js';
import { GARS } from '../GARS';
import { GridType } from './GridType';

/**
 * GARS Grid Label
 *
 *
 */
export class GridLabel extends Label {
  /**
   * Grid type
   */
  private gridType: GridType;

  /**
   * GARS coordinate
   */
  private coordinate: GARS;

  /**
   * Constructor
   *
   * @param name
   *            name
   * @param center
   *            center point
   * @param bounds
   *            bounds
   * @param gridType
   *            grid type
   * @param coordinate
   *            GARS coordinate
   */
  constructor(name: string, center: Point, bounds: Bounds, gridType: GridType, coordinate: GARS) {
    super(name, center, bounds);
    this.gridType = gridType;
    this.coordinate = coordinate;
  }

  /**
   * Get the grid type
   *
   * @return grid type
   */
  public getGridType(): GridType {
    return this.gridType;
  }

  /**
   * Set the grid type
   *
   * @param gridType
   *            grid type
   */
  public setGridType(gridType: GridType): void {
    this.gridType = gridType;
  }

  /**
   * Get the GARS coordinate
   *
   * @return GARS coordinate
   */
  public getCoordinate(): GARS {
    return this.coordinate;
  }

  /**
   * Set the GARS coordinate
   *
   * @param coordinate
   *            GARS coordinate
   */
  public setCoordinate(coordinate: GARS): void {
    this.coordinate = coordinate;
  }
}
