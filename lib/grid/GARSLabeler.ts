import { Color } from '@ngageoint/color-js';
import { Bounds } from '@ngageoint/grid-js';
import { GARS } from '../GARS';
import { GARSUtils } from '../GARSUtils';
import { GridLabel } from './GridLabel';
import { GridLabeler } from './GridLabeler';
import { GridType } from './GridType';

/**
 * GARS grid labeler
 *
 *
 */
export class GARSLabeler extends GridLabeler {
  constructor(enabled: boolean, minZoom = 0, maxZoom?: number, color?: Color, textSize?: number, buffer?: number) {
    super(enabled, minZoom, maxZoom, color, textSize, buffer);
  }

  /**
   * {@inheritDoc}
   */
  public getLabels(tileBounds: Bounds, gridType: GridType): GridLabel[] {
    const labels: GridLabel[] = [];

    tileBounds = tileBounds.toPrecision(gridType);

    for (
      let lon = tileBounds.getMinLongitude();
      lon <= tileBounds.getMaxLongitude();
      lon = GARSUtils.nextPrecision(lon, gridType)
    ) {
      for (
        let lat = tileBounds.getMinLatitude();
        lat <= tileBounds.getMaxLatitude();
        lat = GARSUtils.nextPrecision(lat, gridType)
      ) {
        const bounds = Bounds.degrees(lon, lat, lon + gridType, lat + gridType);
        const center = bounds.getCentroid();
        const coordinate = GARS.fromPoint(center);

        let name: string | null = null;

        switch (gridType) {
          case GridType.TWENTY_DEGREE:
          case GridType.TEN_DEGREE:
          case GridType.FIVE_DEGREE:
          case GridType.ONE_DEGREE:
            name = GARSUtils.getDegreeLabel(lon, lat);
            break;
          default:
            name = coordinate.coordinate(gridType);
        }

        labels.push(new GridLabel(name, center, bounds, gridType, coordinate));
      }
    }

    return labels;
  }
}
