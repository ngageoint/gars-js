import { GARSConstants } from '../GARSConstants';
import { GARSUtils } from '../GARSUtils';

/**
 * Longitude Band Number Range
 *
 *
 */
export class BandNumberRange implements IterableIterator<number> {
  /**
   * Western band number
   */
  private west: number;

  /**
   * Eastern band number
   */
  private east: number;

  /**
   * Band number
   */
  private bandNumber: number;

  /**
   * Constructor
   *
   * @param west
   *            western band number
   * @param east
   *            eastern band number
   */
  constructor(west: number = GARSConstants.MIN_BAND_NUMBER, east: number = GARSConstants.MAX_BAND_NUMBER) {
    this.west = west;
    this.east = east;
    this.bandNumber = this.west;
  }

  /**
   * Get the western band number
   *
   * @return western band number
   */
  public getWest(): number {
    return this.west;
  }

  /**
   * Set the western band number
   *
   * @param west
   *            western band number
   */
  public setWest(west: number): void {
    this.west = west;
  }

  /**
   * Get the eastern band number
   *
   * @return eastern band number
   */
  public getEast(): number {
    return this.east;
  }

  /**
   * Set the eastern band number
   *
   * @param east
   *            eastern band number
   */
  public setEast(east: number): void {
    this.east = east;
  }

  /**
   * Get the western longitude
   *
   * @return longitude
   */
  public getWestLongitude(): number {
    return GARSUtils.getLongitude(this.west);
  }

  /**
   * Get the eastern longitude
   *
   * @return longitude
   */
  public getEastLongitude(): number {
    return GARSUtils.getLongitude(this.east);
  }

  public next(): IteratorResult<number> {
    if (this.bandNumber <= this.east) {
      return {
        done: false,
        value: this.bandNumber++,
      };
    } else {
      return {
        done: true,
        value: null,
      };
    }
  }

  [Symbol.iterator](): IterableIterator<number> {
    return this;
  }
}
