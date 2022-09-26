import { Bounds } from '@ngageoint/grid-js';
import { BandLettersRange } from './BandLettersRange';
import { BandNumberRange } from './BandNumberRange';

/**
 * Grid Range
 *
 * @author osbornb
 */
export class GridRange implements Iterable<GARS> {
  /**
   * Band Number Range
   */
  private bandNumberRange: BandNumberRange;

  /**
   * Band Letters Range
   */
  private bandLettersRange: BandLettersRange;

  /**
   * Band numbers
   */
  private readonly bandNumbers: Iterator<number>;

  /**
   * Band letters
   */
  private bandLetters: Iterator<string>;

  /**
   * Current band number
   */
  private bandNumber: number;

  /**
   * Constructor (full range if no parameters)
   *
   * @param bandNumberRange
   *            band number range
   * @param bandLettersRange
   *            band letters range
   */
  constructor(bandNumberRange = new BandNumberRange(), bandLettersRange = new BandLettersRange()) {
    this.bandNumberRange = bandNumberRange;
    this.bandLettersRange = bandLettersRange;

    this.bandNumbers = bandNumberRange.iterator();
    this.bandLetters = bandLettersRange.iterator();

    this.bandNumber = this.bandNumbers.hasNext() ? this.bandNumbers.next() : null;
  }

  /**
   * Get the band number range
   *
   * @return band number range
   */
  public getBandNumberRange(): BandNumberRange {
    return this.bandNumberRange;
  }

  /**
   * Set the band number range
   *
   * @param bandNumberRange
   *            band number range
   */
  public setBandNumberRange(bandNumberRange: BandNumberRange): void {
    this.bandNumberRange = bandNumberRange;
  }

  /**
   * Get the band letters range
   *
   * @return band letters range
   */
  public getBandLettersRange(): BandLettersRange {
    return this.bandLettersRange;
  }

  /**
   * Set the band letters range
   *
   * @param bandLettersRange
   *            band letters range
   */
  public setBandLettersRange(bandLettersRange: BandLettersRange): void {
    this.bandLettersRange = bandLettersRange;
  }

  /**
   * Get the grid range bounds
   *
   * @return bounds
   */
  public getBounds(): Bounds {
    const west = this.bandNumberRange.getWestLongitude();
    const south = this.bandLettersRange.getSouthLatitude();
    const east = this.bandNumberRange.getEastLongitude();
    const north = this.bandLettersRange.getNorthLatitude();

    return Bounds.degrees(west, south, east, north);
  }

  [Symbol.iterator](): Iterator<string> {
    return {
      next: function () {
        const letters = bandLetters.next();
        const gars = GARS.create(bandNumber, letters);
        if (!bandLetters.hasNext()) {
          if (bandNumbers.hasNext()) {
            bandNumber = bandNumbers.next();
            bandLetters = bandLettersRange.iterator();
          } else {
            bandNumber = null;
          }
        }
        return gars;
      },
    };
  }
}
