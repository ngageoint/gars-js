import { GridConstants } from '@ngageoint/grid-js';

/**
 * Global Area Reference System Constants
 *
 *
 */
export class GARSConstants {
  /**
   * Minimum longitude
   */
  public static readonly MIN_LON = GridConstants.MIN_LON;

  /**
   * Maximum longitude
   */
  public static readonly MAX_LON = GridConstants.MAX_LON;

  /**
   * Minimum latitude
   */
  public static readonly MIN_LAT = GridConstants.MIN_LAT;

  /**
   * Maximum latitude
   */
  public static readonly MAX_LAT = GridConstants.MAX_LAT;

  /**
   * Minimum grid longitude band number
   */
  public static readonly MIN_BAND_NUMBER = 1;

  /**
   * Maximum grid longitude band number
   */
  public static readonly MAX_BAND_NUMBER = 720;

  /**
   * Minimum grid latitude band letters
   */
  public static readonly MIN_BAND_LETTERS = 'AA';

  /**
   * Maximum grid latitude band letters
   */
  public static readonly MAX_BAND_LETTERS = 'QZ';

  /**
   * Minimum grid latitude single band letter
   */
  public static readonly MIN_BAND_LETTER = 'A';

  /**
   * Maximum grid latitude single band letter
   */
  public static readonly MAX_BAND_LETTER = 'Z';

  /**
   * Minimum grid latitude band letters number equivalent
   */
  public static readonly MIN_BAND_LETTERS_NUMBER = 1;

  /**
   * Maximum grid latitude band letters number equivalent
   */
  public static readonly MAX_BAND_LETTERS_NUMBER = 360;

  /**
   * Default quadrant (southwest corner)
   */
  public static readonly DEFAULT_QUADRANT = 3;

  /**
   * Default keypad (southwest corner)
   */
  public static readonly DEFAULT_KEYPAD = 7;
}
