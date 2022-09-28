import { Color } from '@ngageoint/color-js';
import { Bounds, Labeler, PropertyConstants } from '@ngageoint/grid-js';
import { GARSProperties } from '../property/GARSProperties';
import { GridLabel } from './GridLabel';
import { GridType } from './GridType';

/**
 * Grid Labeler
 *
 * @author osbornb
 */
export abstract class GridLabeler extends Labeler {
  /**
   * Default text size
   */
  public static readonly DEFAULT_TEXT_SIZE = GARSProperties.getInstance().getDoubleProperty(
    true,
    PropertyConstants.LABELER,
    PropertyConstants.TEXT_SIZE,
  );

  /**
   * Default buffer size
   */
  public static readonly DEFAULT_BUFFER = GARSProperties.getInstance().getDoubleProperty(
    true,
    PropertyConstants.LABELER,
    PropertyConstants.BUFFER,
  );

  constructor(
    enabled: boolean,
    minZoom = 0,
    maxZoom?: number,
    color = Color.black(),
    textSize = GridLabeler.DEFAULT_TEXT_SIZE,
    buffer = GridLabeler.DEFAULT_BUFFER,
  ) {
    super(enabled, minZoom, maxZoom, color, textSize!, buffer!);
  }

  /**
   * Get labels for the bounds
   *
   * @param tileBounds
   *            tile bounds
   * @param gridType
   *            grid type
   * @return labels
   */
  public abstract getLabels(tileBounds: Bounds, gridType: GridType): GridLabel[];
}
