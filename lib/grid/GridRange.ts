import { Bounds } from '@ngageoint/grid-js';
import { GARS } from '../GARS';
import { BandLettersRange } from './BandLettersRange';
import { BandNumberRange } from './BandNumberRange';

/**
 * Grid Range
 *
 *
 */
export class GridRange implements IterableIterator<GARS> {
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
  private bandNumbers: IteratorResult<number>;

  /**
   * Band letters
   */
  private bandLetters: IteratorResult<string>;

  /**
   * Current band number
   */
  private bandNumber?: number;

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

    this.bandNumbers = bandNumberRange.next();
    this.bandLetters = bandLettersRange.next();

    if (!this.bandNumbers.done) {
      this.bandNumber = this.bandNumbers.value;
    }
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

  public next(): IteratorResult<GARS> {
    if (this.bandNumber && !this.bandLetters.done) {
      const letters = this.bandLetters.value;
      this.bandLetters = this.bandLettersRange.next();
      const gars = GARS.create(this.bandNumber, letters);
      if (this.bandLetters.done) {
        if (!this.bandNumbers.done) {
          this.bandNumbers = this.bandNumberRange.next();
          this.bandNumber = this.bandNumbers.value;

          this.bandLettersRange.reset();
          this.bandLetters = this.bandLettersRange.next();
        } else {
          this.bandNumber = undefined;
        }
      }

      return {
        done: false,
        value: gars,
      };
    } else {
      return {
        done: true,
        value: null,
      };
    }
  }

  [Symbol.iterator](): IterableIterator<GARS> {
    return this;
  }
}
