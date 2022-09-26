import { GridType } from "./GridType";

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
        GridType[] types = Arrays.copyOfRange(GridType.values(), 0,
            type.ordinal());
        return new Set<GridType>(types);
    }

    /**
     * Get the more precise (smaller precision value) grid types
     * 
     * @param type
     *            grid type
     * @return grid types more precise
     */
    public static morePrecise(type: GridType): Set<GridType> {
        GridType[] values = GridType.values();
        GridType[] types = Arrays.copyOfRange(values, type.ordinal() + 1,
            values.length);
        return new Set<GridType>(types);
    }

}
