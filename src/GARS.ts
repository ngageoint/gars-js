import { Point } from "@ngageoint/grid-js";
import { GARSConstants } from "./GARSConstants";
import { GridType } from "./grid/GridType";

/**
 * Global Area Reference System Coordinate
 * 
 * @author osbornb
 */
export class GARS {

    /**
     * GARS string pattern
     */
    private static final Pattern garsPattern = Pattern.compile(
        "^(\\d{3})([A-HJ-NP-Z]{2})(?:([1-4])([1-9])?)?$",
        Pattern.CASE_INSENSITIVE);

    /**
     * Longitudinal band number
     */
    private readonly longitude: number;

    /**
     * Latitudinal band letters
     */
    private readonly latitude: string;

    /**
     * 15 minute quadrant
     */
    private readonly quadrant: number;

    /**
     * 5 minute keypad
     */
    private readonly keypad: number;

    /**
     * Create
     * 
     * @param longitude
     *            longitudinal band number
     * @param latitude
     *            latitudinal band letters
     * @param quadrant
     *            15 minute quadrant
     * @param keypad
     *            5 minute keypad
     * @return GARS
     */
    public static create(longitude: number, latitude: string, quadrant?: number,
        keypad?: number): GARS {
        return new GARS(longitude, latitude, quadrant, keypad);
    }

    /**
     * Constructor
     * 
     * @param longitude
     *            longitudinal band number
     * @param latitude
     *            latitudinal band letters
     * @param quadrant
     *            15 minute quadrant or GARSConstants.DEFAULT_QUADRANT if undefined
     * @param keypad
     *            5 minute keypad or GARSConstants.DEFAULT_KEYPAD if undefined
     */
    constructor(longitude: number, latitude: string, quadrant = GARSConstants.DEFAULT_QUADRANT, keypad = GARSConstants.DEFAULT_KEYPAD) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.quadrant = quadrant;
        this.keypad = keypad;
    }

    /**
     * Get the longitudinal band number
     * 
     * @return longitude band number
     */
    public getLongitude(): number {
        return this.longitude;
    }

    /**
     * Get the latitudinal band letters
     * 
     * @return latitude band letters
     */
    public getLatitude(): string {
        return this.latitude;
    }

    /**
     * Get the 15 minute quadrant
     * 
     * @return quadrant
     */
    public getQuadrant(): number {
        return this.quadrant;
    }

    /**
     * Get the 5 minute keypad
     * 
     * @return keypad
     */
    public getKeypad(): number {
        return this.keypad;
    }

    /**
     * Get the GARS coordinate with specified grid precision
     * 
     * @param type
     *            grid type precision
     * @return GARS coordinate
     */
    public coordinate(type = GridType.FIVE_MINUTE): string {
        let gars = '';

        gars += String.format("%03d", this.longitude);
        gars += this.latitude;

        if (type === GridType.FIFTEEN_MINUTE || type === GridType.FIVE_MINUTE) {

            gars += this.quadrant;

            if (type === GridType.FIVE_MINUTE) {

                gars += this.keypad;

            }

        }

        return gars;
    }

    /**
     * Convert to a point
     * 
     * @return point
     */
    public toPoint(): Point {

        let lon = GARSUtils.getLongitude(this.longitude);
        let lat = GARSUtils.getLatitude(this.latitude);

        lon += GARSUtils.quadrantColumn(this.quadrant)
            * GridType.FIFTEEN_MINUTE;
        lat += GARSUtils.quadrantRow(this.quadrant)
            * GridType.FIFTEEN_MINUTE;

        lon += GARSUtils.keypadColumn(this.keypad)
            * GridType.FIVE_MINUTE;
        lat += GARSUtils.keypadRow(this.keypad)
            * GridType.FIVE_MINUTE;

        return new Point(lon, lat);
    }

    /**
     * {@inheritDoc}
     */
    public toString(): string {
        return this.coordinate();
    }

    /**
     * {@inheritDoc}
     */
    public equals(obj: any): boolean {
        if (this === obj)
            return true;
        if (!obj)
            return false;
        if (typeof this !== typeof obj)
            return false;
        const other = obj as GARS;
        if (this.keypad !== other.keypad)
            return false;
        if (!this.latitude) {
            if (other.latitude)
                return false;
        } else if (this.latitude !== other.latitude)
            return false;
        if (this.longitude !== other.longitude)
            return false;
        if (this.quadrant !== other.quadrant)
            return false;
        return true;
    }

    /**
     * Return whether the given string is valid GARS string
     *
     * @param gars
     *            potential GARS string
     * @return true if GARS string is valid, false otherwise
     */
    public static boolean isGARS(String gars) {
        gars = removeSpaces(gars);
		Matcher matcher = garsPattern.matcher(gars);
		boolean matches = matcher.matches();
        if (matches) {
			int longitude = Integer.parseInt(matcher.group(1));
            matches = longitude >= GARSConstants.MIN_BAND_NUMBER
                && longitude <= GARSConstants.MAX_BAND_NUMBER;
            if (matches) {
				String latitude = matcher.group(2).toUpperCase();
				int latitudeValue = GARSUtils.bandValue(latitude);
                matches = latitudeValue >= GARSConstants.MIN_BAND_LETTERS_NUMBER
                    && latitudeValue <= GARSConstants.MAX_BAND_LETTERS_NUMBER;
            }
        }
        return matches;
    }

    /**
     * Removed spaces from the value
     * 
     * @param value
     *            value string
     * @return value without spaces
     */
    private static removeSpaces(value: string): string {
        return value.replaceAll("\\s", "");
    }

    /**
     * Encodes a point as a GARS string
     *
     * @param point
     *            point
     * @return GARS
     */
    public static fromPoint(point: Point): GARS {
        point = point.toDegrees();
        return this.from(point.getLongitude(), point.getLatitude());
    }

    /**
     * Convert the coordinate to GARS
     *
     * @param longitude
     *            longitude
     * @param latitude
     *            latitude
     * @return GARS
     */
    public static from(longitude: number, latitude: number): GARS {

        const lon = GARSUtils.getLongitudeDecimalBand(longitude);
        const lat = GARSUtils.getLatitudeDecimalBandValue(latitude);

        const latBand = GARSUtils.bandLetters(lat);

        const quadrantColumn = lon * 2.0;
        const quadrantRow = lat * 2.0;

        const quadrant = GARSUtils.quadrant(quadrantColumn, quadrantRow);

        const keypadColumn = (quadrantColumn * 3.0);
        const keypadRow = (quadrantRow * 3.0);

        const keypad = GARSUtils.keypad(keypadColumn, keypadRow);

        return GARS.create(lon, latBand, quadrant, keypad);
    }

    /**
     * Parse a GARS string
     * 
     * @param gars
     *            GARS string
     * @return GARS
     */
    public static parse(gars: string): GARS {
        const matcher = garsPattern.matcher(this.removeSpaces(gars));
        if (!matcher.matches()) {
            throw new Error("Invalid GARS: " + gars);
        }

        const longitude = Number.parseInt(matcher.group(1));
        if (longitude < GARSConstants.MIN_BAND_NUMBER
            || longitude > GARSConstants.MAX_BAND_NUMBER) {
            throw new Error("Invalid GARS longitude: "
                + matcher.group(1) + ", GARS: " + gars);
        }

        const latitude = matcher.group(2).toUpperCase();
        const latitudeValue = GARSUtils.bandValue(latitude);
        if (latitudeValue < GARSConstants.MIN_BAND_LETTERS_NUMBER
            || latitudeValue > GARSConstants.MAX_BAND_LETTERS_NUMBER) {
            throw new Error("Invalid GARS latitude: "
                + matcher.group(2) + ", GARS: " + gars);
        }

        let quadrant = GARSConstants.DEFAULT_QUADRANT;
        let keypad = GARSConstants.DEFAULT_KEYPAD;

        const quadrantValue = matcher.group(3);
        if (quadrantValue != null) {

            quadrant = Number.parseInt(quadrantValue);

            const keypadValue = matcher.group(4);
            if (keypadValue != null) {

                keypad = Number.parseInt(keypadValue);

            }

        }

        return GARS.create(longitude, latitude, quadrant, keypad);
    }

    /**
     * Parse the GARS string for the precision
     * 
     * @param gars
     *            GARS string
     * @return grid type precision
     */
    public static precision(gars: string): GridType {
        const matcher = garsPattern.matcher(this.removeSpaces(gars));
        if (!matcher.matches()) {
            throw new Error("Invalid GARS: " + gars);
        }

        let precision: GridType | undefined;

        if (matcher.group(4) != null) {
            precision = GridType.FIVE_MINUTE;
        } else if (matcher.group(3) != null) {
            precision = GridType.FIFTEEN_MINUTE;
        } else {
            precision = GridType.THIRTY_MINUTE;
        }

        return precision;
    }

}