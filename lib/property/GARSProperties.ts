import { GridProperties } from '@ngageoint/grid-js';

/**
 * GARS property loader
 *
 *
 */
export class GARSProperties extends GridProperties {
  /**
   * Property file name
   */
  public static readonly PROPERTIES_FILE = './resources/gars.properties';

  /**
   * Singleton instance
   */
  public static instance = new GARSProperties();

  /**
   * Get the singleton instance
   *
   * @return instance
   */
  public static getInstance(): GARSProperties {
    return GARSProperties.instance;
  }

  /**
   * {@inheritDoc}
   */
  public getFile(): string {
    return GARSProperties.PROPERTIES_FILE;
  }
}
