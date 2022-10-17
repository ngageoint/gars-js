import { GridProperties } from '@ngageoint/grid-js';

/**
 * GARS property loader
 *
 *
 */
export class GARSProperties extends GridProperties {
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
}
