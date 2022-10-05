import { Line, Point } from '@ngageoint/grid-js';
import { GridType } from '../grid/GridType';

/**
 * Line between two points
 *
 * @author osbornb
 */
export class GridLine extends Line {
  /**
   * Grid type the line represents if any
   */
  private gridType?: GridType;

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
    const gl: GridLine = new GridLine();
    gl.setPoints(point1, point2);
    gl.setGridType(gridType);
    return gl;
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
    const gl: GridLine = new GridLine();
    gl.hasZ = line.hasZ;
    gl.hasM = line.hasM;
    for (const point of line.points) {
      gl.addPoint(point.copy() as Point);
    }
    gl.setGridType(gridType);
    return gl;
  }

  /**
   * Get the line grid type
   *
   * @return grid type
   */
  public getGridType(): GridType | undefined {
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
  public setGridType(gridType?: GridType): void {
    this.gridType = gridType;
  }

  /**
   * Copy the line
   *
   * @return line copy
   */
  public copy(): GridLine {
    const gridLineCopy = new GridLine(this);
    gridLineCopy.setGridType(this.gridType);
    return gridLineCopy;
  }

  /**
   * {@inheritDoc}
   */
  public equals(obj: any): boolean {
    if (this === obj) return true;
    if (!super.equals(obj as any)) return false;
    if (typeof this !== typeof obj) return false;
    const other = obj as GridLine;
    if (this.gridType !== other.gridType) return false;
    return true;
  }
}
