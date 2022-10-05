import { GridType } from './GridType';

/**
 * Grid type enumeration utilities
 *
 * @author osbornb
 */
export class GridTypeUtils {
  /**
   * Get the precision of the value in degrees
   *
   * @param value
   *            value in degrees
   * @return precision grid type
   */
  public static getPrecision(value: number): GridType {
    let precision = GridType.FIVE_MINUTE;
    if (value % GridType.TWENTY_DEGREE === 0) {
      precision = GridType.TWENTY_DEGREE;
    } else if (value % GridType.TEN_DEGREE === 0) {
      precision = GridType.TEN_DEGREE;
    } else if (value % GridType.FIVE_DEGREE === 0) {
      precision = GridType.FIVE_DEGREE;
    } else if (value % GridType.ONE_DEGREE === 0) {
      precision = GridType.ONE_DEGREE;
    } else if (value % GridType.THIRTY_MINUTE === 0) {
      precision = GridType.THIRTY_MINUTE;
    } else if (value % GridType.FIFTEEN_MINUTE === 0) {
      precision = GridType.FIFTEEN_MINUTE;
    }

    return precision;
  }

  /**
   * Get the less precise (larger precision value) grid types
   *
   * @param type
   *            grid type
   * @return grid types less precise
   */
  public static lessPrecise(type: GridType): Set<GridType> {
    const values = GridTypeUtils.values();
    const ordinal = GridTypeUtils.ordinal(type);

    const types = new Set<GridType>();
    for (let i = 0; i < ordinal; i++) {
      types.add(values[i]);
    }

    return types;
  }

  /**
   * Get the more precise (smaller precision value) grid types
   *
   * @param type
   *            grid type
   * @return grid types more precise
   */
  public static morePrecise(type: GridType): Set<GridType> {
    const values = GridTypeUtils.values();
    const ordinal = GridTypeUtils.ordinal(type);

    const types = new Set<GridType>();
    for (let i = ordinal; i < values.length; i++) {
      types.add(values[i]);
    }
    return types;
  }

  public static values(): GridType[] {
    const gridTypes: GridType[] = [];
    for (const type of Object.values(GridType)) {
      if (Number.isInteger(type)) {
        gridTypes.push(type as number);
      }
    }
    return gridTypes;
  }

  public static ordinal(type: GridType): number {
    const types: string[] = Object.keys(GridType);

    let ordinal = 0;
    for (let i = 0; i < types.length; i++) {
      if (isNaN(Number(types[i]))) {
        if (types[i] === GridType[type]) {
          break;
        }
        ordinal++;
      }
    }

    return ordinal;
  }
}
