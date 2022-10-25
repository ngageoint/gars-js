import { GridProperties } from '@ngageoint/grid-js';
import * as config from '../../resources/gars.json';

/**
 * GARS property loader
 *
 *
 */
export class GARSProperties extends GridProperties {
  /**
   * Singleton instance
   */
  public static instance = new GARSProperties(config);

  /**
   * Get the singleton instance
   *
   * @return instance
   */
  public static getInstance(): GARSProperties {
    return GARSProperties.instance;
  }
}
