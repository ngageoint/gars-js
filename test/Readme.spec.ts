import { GridTile, Point } from '@ngageoint/grid-js';
import { GARS } from '../lib/GARS';
import { GridType } from '../lib/grid/GridType';
import { Grids } from '../lib/grid/Grids';

/**
 * README example tests
 *
 * @author osbornb
 */
describe('Readme Tests', function () {
  /**
   * Test GARS coordinates
   *
   * @throws ParseException
   *             upon failure to parse
   */
  it('test coordinates', function () {
    const gars = GARS.parse('006AG39');
    const point = gars.toPoint();
    const pointMeters = point.toMeters();

    const latitude = 63.98862388;
    const longitude = 29.06755082;
    const point2 = Point.point(longitude, latitude);
    const gars2 = GARS.fromPoint(point2);
    const garsCoordinate = gars2.toString();
    const gars30m = gars2.coordinate(GridType.THIRTY_MINUTE);
    const gars15m = gars2.coordinate(GridType.FIFTEEN_MINUTE);
    const gars5m = gars2.coordinate(GridType.FIVE_MINUTE);
  });

  /**
   * Test draw tile template logic
   */
  it('test draw tile', function () {
    testDrawTile(GridTile.tile(512, 512, 8, 12, 5));
  });
});

function testDrawTile(tile: GridTile): void {
  // GridTile tile = ...;

  const grids = Grids.create();

  const zoomGrids = grids.getGrids(tile.getZoom());
  if (zoomGrids && zoomGrids.hasGrids()) {
    for (const grid of zoomGrids) {
      const lines = grid.getLinesFromGridTile(tile);
      if (lines) {
        for (const line of lines) {
          const pixel1 = line.getPoint1().getPixelFromTile(tile);
          const pixel2 = line.getPoint2().getPixelFromTile(tile);
          // Draw line
        }
      }

      const labels = grid.getLabelsFromGridTile(tile);
      if (labels) {
        for (const label of labels) {
          const pixelRange = label.getBounds()!.getPixelRangeFromTile(tile);
          const centerPixel = label.getCenter()!.getPixelFromTile(tile);
          // Draw label
        }
      }
    }
  }
}
