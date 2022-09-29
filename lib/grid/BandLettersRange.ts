import { GARSConstants } from '../GARSConstants';
import { GARSUtils } from '../GARSUtils';

/**
 * Latitude Band Letters Range
 *
 * @author osbornb
 */
export class BandLettersRange implements IterableIterator<string> {
  /**
   * Southern band letters
   */
  private south: string;

  /**
   * Northern band letters
   */
  private north: string;

  /**
   * Band letters value
   */
  private value: number;

  /**
   * Band letters max value (north)
   */
  private readonly maxValue: number;

  /**
   * Constructor (full range if no parameters provided)
   *
   * @param south
   *            southern band letters
   * @param north
   *            northern band letters
   */
  constructor(south = GARSConstants.MIN_BAND_LETTERS, north = GARSConstants.MAX_BAND_LETTERS) {
    this.south = south;
    this.north = north;
    this.value = this.getSouthValue();
    this.maxValue = this.getNorthValue();
  }

  /**
   * Get the southern band letters
   *
   * @return southern band letters
   */
  public getSouth(): string {
    return this.south;
  }

  /**
   * Set the southern band letters
   *
   * @param south
   *            southern band letters
   */
  public setSouth(south: string): void {
    this.south = south;
  }

  /**
   * Get the northern band letters
   *
   * @return northern band letters
   */
  public getNorth(): string {
    return this.north;
  }

  /**
   * Set the northern band letters
   *
   * @param north
   *            northern band letters
   */
  public setNorth(north: string): void {
    this.north = north;
  }

  /**
   * Get the southern band letters equivalent number value
   *
   * @return southern band letters value
   */
  public getSouthValue(): number {
    return GARSUtils.bandValue(this.south);
  }

  /**
   * Get the norther band letters equivalent number value
   *
   * @return norther band letters value
   */
  public getNorthValue(): number {
    return GARSUtils.bandValue(this.north);
  }

  /**
   * Get the southern latitude
   *
   * @return latitude
   */
  public getSouthLatitude(): number {
    return GARSUtils.getLatitude(this.south);
  }

  /**
   * Get the northern latitude
   *
   * @return latitude
   */
  public getNorthLatitude(): number {
    return GARSUtils.getLatitude(this.north);
  }

  public next(): IteratorResult<string> {
    if (this.value <= this.maxValue) {
      return {
        done: false,
        value: GARSUtils.bandLetters(this.value++),
      };
    } else {
      return {
        done: true,
        value: null,
      };
    }
  }

  public reset(): void {
    this.value = this.getSouthValue();
  }

  [Symbol.iterator](): IterableIterator<string> {
    return this;
  }
}
