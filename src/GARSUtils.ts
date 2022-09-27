import { Bounds, GridConstants, GridUtils } from '@ngageoint/grid-js';
import { GARSConstants } from './GARSConstants';
import { BandLettersRange } from './grid/BandLettersRange';
import { BandNumberRange } from './grid/BandNumberRange';
import { GridRange } from './grid/GridRange';
import { GridType } from './grid/GridType';

/**
 * Global Area Reference System utilities
 *
 * @author osbornb
 */
export class GARSUtils {
  /**
   * Get the longitude from the longitude band
   *
   * @param band
   *            longitudinal band number
   * @return longitude
   */
  public static getLongitude(band: number): number {
    return GARSConstants.MIN_LON + (band - 1) * GridType.THIRTY_MINUTE;
  }

  /**
   * Get the latitude from the latitude band letters number equivalent
   *
   * @param band
   *            latitudinal band number or band letters
   * @return latitude
   */
  public static getLatitude(band: number | string): number {
    if (typeof band === 'string') {
      band = this.bandValue(band);
    }
    return GARSConstants.MIN_LAT + (band - 1) * GridType.THIRTY_MINUTE;
  }

  /**
   * Get the longitude band from the longitude
   *
   * @param longitude
   *            longitude
   * @return longitude band
   */
  public static getLongitudeBand(longitude: number): number {
    return this.getLongitudeDecimalBand(longitude);
  }

  /**
   * Get the longitude decimal band from the longitude
   *
   * @param longitude
   *            longitude
   * @return longitude decimal band
   */
  public static getLongitudeDecimalBand(longitude: number): number {
    return (longitude - GARSConstants.MIN_LON) / GridType.THIRTY_MINUTE + 1.0;
  }

  /**
   * Get the latitude band letters from the latitude
   *
   * @param latitude
   *            latitude
   * @return latitude band letters
   */
  public static getLatitudeBand(latitude: number): string {
    return this.bandLetters(this.getLatitudeBandValue(latitude));
  }

  /**
   * Get the latitude band value from the latitude
   *
   * @param latitude
   *            latitude
   * @return latitude band value
   */
  public static getLatitudeBandValue(latitude: number): number {
    return this.getLatitudeDecimalBandValue(latitude);
  }

  /**
   * Get the latitude decimal band value from the latitude
   *
   * @param latitude
   *            latitude
   * @return latitude decimal band value
   */
  public static getLatitudeDecimalBandValue(latitude: number): number {
    return (latitude - GARSConstants.MIN_LAT) / GridType.THIRTY_MINUTE + 1.0;
  }

  /**
   * Get the latitude band number equivalent to the longitude band (where AA
   * is 1 and QZ is 360)
   *
   * @param latitudeBand
   *            two character latitude band
   * @return number band value
   */
  public static bandValue(latitudeBand: string): number {
    const latitude = latitudeBand.toUpperCase();
    const latitude1 = this.bandValueFromChar(latitude.charCodeAt(0));
    const latitude2 = this.bandValueFromChar(latitude.charCodeAt(1));
    return 24 * (latitude1 - 1) + latitude2;
  }

  /**
   * Get the latitude character band number equivalent (where A is 1 and Z is
   * 24)
   *
   * @param latitudeBand
   *            single character from latitude band
   * @return number band value
   */
  public static bandValueFromChar(latitudeBand: number): number {
    let value = latitudeBand - GARSConstants.MIN_BAND_LETTER.charCodeAt(0) + 1;
    if (latitudeBand > GridConstants.BAND_LETTER_OMIT_I.charCodeAt(0)) {
      value--;
      if (latitudeBand > GridConstants.BAND_LETTER_OMIT_O.charCodeAt(0)) {
        value--;
      }
    }
    return value;
  }

  /**
   * Get the latitude band from the band number (where 1 is AA and 360 is QZ)
   *
   * @param bandValue
   *            number band value
   * @return two character latitude band
   */
  public static bandLetters(bandValue: number): string {
    bandValue -= 1;
    const latitude1 = bandValue / 24;
    const latitude2 = bandValue % 24;
    return this.bandLetter(latitude1 + 1) + this.bandLetter(latitude2 + 1);
  }

  /**
   * Get the latitude character equivalent from the band number (where 1 is A
   * and 24 is Z)
   *
   * @param bandValue
   *            number band value
   * @return single character of latitude band
   */
  public static bandLetter(bandValue: number): string {
    let letter = GARSConstants.MIN_BAND_LETTER.charCodeAt(0);
    letter += bandValue - 1;
    if (letter >= GridConstants.BAND_LETTER_OMIT_I.charCodeAt(0)) {
      letter++;
      if (letter >= GridConstants.BAND_LETTER_OMIT_O.charCodeAt(0)) {
        letter++;
      }
    }
    return String.fromCharCode(letter);
  }

  /**
   * Get the quadrant southwest origin 0 indexed column
   *
   * @param quadrant
   *            quadrant number
   * @return 0 for quadrants 1|3, 1 for quadrants 2|4
   */
  public static quadrantColumn(quadrant: number): number {
    return quadrant % 2 === 0 ? 1 : 0;
  }

  /**
   * Get the quadrant southwest origin 0 indexed row
   *
   * @param quadrant
   *            quadrant number
   * @return 0 for quadrants 3|4, 1 for quadrants 1|2
   */
  public static quadrantRow(quadrant: number): number {
    return quadrant >= 3 ? 0 : 1;
  }

  /**
   * Get the keypad southwest origin 0 indexed column
   *
   * @param keypad
   *            keypad number
   * @return 0 for keypads 1|4|7, 1 for keypads 2|5|8, 2 for keypads 3|6|9
   */
  public static keypadColumn(keypad: number): number {
    let column = 0;
    if (keypad % 3 === 0) {
      column = 2;
    } else if ((keypad + 1) % 3 === 0) {
      column = 1;
    }
    return column;
  }

  /**
   * Get the keypad southwest origin 0 indexed row
   *
   * @param keypad
   *            keypad number
   * @return 0 for keypads 7|8|9, 1 for keypads 4|5|6, 2 for keypads 1|2|3
   */
  public static keypadRow(keypad: number): number {
    let row = 0;
    if (keypad <= 3) {
      row = 2;
    } else if (keypad <= 6) {
      row = 1;
    }
    return row;
  }

  /**
   * Get the quadrant from the southwest origin 0 indexed column and row
   *
   * @param column
   *            0 indexed column
   * @param row
   *            0 indexed row
   * @return quadrant
   */
  public static quadrant(column: number, row: number): number {
    return (1 - row) * 2 + column + 1;
  }

  /**
   * Get the keypad from the southwest origin 0 indexed column and row
   *
   * @param column
   *            0 indexed column
   * @param row
   *            0 indexed row
   * @return keypad
   */
  public static keypad(column: number, row: number): number {
    return (2 - row) * 3 + column + 1;
  }

  /**
   * Get a grid range from the bounds
   *
   * @param bounds
   *            bounds
   * @return grid range
   */
  public static getGridRange(bounds: Bounds): GridRange {
    bounds = bounds.toDegrees();
    const bandNumberRange = this.getBandNumberRangeFromBounds(bounds);
    const bandLettersRange = this.getBandLettersRangeFromBounds(bounds);
    return new GridRange(bandNumberRange, bandLettersRange);
  }

  /**
   * Get a band number range between the western and eastern bounds
   *
   * @param bounds
   *            bounds
   * @return band number range
   */
  public static getBandNumberRangeFromBounds(bounds: Bounds): BandNumberRange {
    bounds = bounds.toDegrees();
    return this.getBandNumberRange(bounds.getMinLongitude(), bounds.getMaxLongitude());
  }

  /**
   * Get a band number range between the western and eastern longitudes
   *
   * @param west
   *            western longitude in degrees
   * @param east
   *            eastern longitude in degrees
   * @return band number range
   */
  public static getBandNumberRange(west: number, east: number): BandNumberRange {
    const westBand = this.getLongitudeBand(west);
    const eastBand = this.getLongitudeBand(east);
    return new BandNumberRange(westBand, eastBand);
  }

  /**
   * Get a band letters range between the southern and northern bounds
   *
   * @param bounds
   *            bounds
   * @return band letters range
   */
  public static getBandLettersRangeFromBounds(bounds: Bounds): BandLettersRange {
    bounds = bounds.toDegrees();
    return this.getBandLettersRange(bounds.getMinLatitude(), bounds.getMaxLatitude());
  }

  /**
   * Get a band letters range between the southern and northern latitudes in
   * degrees
   *
   * @param south
   *            southern latitude in degrees
   * @param north
   *            northern latitude in degrees
   * @return band letters range
   */
  public static getBandLettersRange(south: number, north: number): BandLettersRange {
    const southBand = this.getLatitudeBand(south);
    const northBand = this.getLatitudeBand(north);
    return new BandLettersRange(southBand, northBand);
  }

  /**
   * Create a degree grid label
   *
   * @param longitude
   *            longitude
   * @param latitude
   *            latitude
   * @return degree label
   */
  public static getDegreeLabel(longitude: number, latitude: number): string {
    let label = '';
    label += Math.abs(longitude);
    label += longitude < 0 ? GridConstants.WEST_CHAR : GridConstants.EAST_CHAR;
    label += Math.abs(latitude);
    label += latitude < 0 ? GridConstants.SOUTH_CHAR : GridConstants.NORTH_CHAR;
    return label.toString();
  }

  /**
   * Get the next precision value from the precision value and precision
   *
   * @param value
   *            precision value
   * @param precision
   *            grid precision
   * @return next precision value
   */
  public static nextPrecision(value: number, precision: number): number {
    let nextValue = value;
    if (precision < GridType.FIFTEEN_MINUTE) {
      nextValue = GridUtils.precisionAfter(value + 0.5 * precision, precision);
    } else {
      nextValue += precision;
    }
    return nextValue;
  }
}
