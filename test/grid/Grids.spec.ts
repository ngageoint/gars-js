import { GridTile } from '@ngageoint/grid-js';
import { expect } from 'chai';
import { Grids } from '../../lib/grid/Grids';
import { GridType } from '../../lib/grid/GridType';

describe('Grids Tests', function () {
  it('test construction', function () {
    const defaultGrids = new Grids();
    for (const grid of defaultGrids.grids()) {
      expect(grid.isEnabled()).to.equal(true);
    }

    const enabledGrids = new Grids([GridType.FIFTEEN_MINUTE]);
    for (const grid of enabledGrids.grids()) {
      if (grid.getType().valueOf() === GridType.FIFTEEN_MINUTE.valueOf()) {
        expect(grid.isEnabled()).to.equal(true);
      } else {
        expect(grid.isEnabled()).to.equal(false);
      }
    }
  });

  it('test color', function () {
    const grids = Grids.create([GridType.TEN_DEGREE]);
    const grid = grids.getGrid(GridType.TEN_DEGREE);
    expect(grid?.getColor()).to.not.be.undefined;
  });

  it('test width', function () {
    const grids = Grids.create([GridType.TEN_DEGREE]);
    const grid = grids.getGrid(GridType.TEN_DEGREE);
    expect(grid?.getWidth()).to.equal(2);
  });

  it('test tile grids', function () {
    const zoom = 5;

    const grids = Grids.create();
    const tile = GridTile.tile(256, 256, 45, 28, zoom);
    const zoomGrids = grids.getGrids(zoom);
    expect(zoomGrids?.hasGrids()).to.be.true;
    expect(zoomGrids?.getGrids().size()).to.equal(1);
    expect(zoomGrids?.getPrecision()?.valueOf()).to.equal(GridType.TEN_DEGREE);

    for (const grid of zoomGrids!.getGrids()) {
      const lines = grid.getLinesFromGridTile(tile);
      expect(lines?.length).to.equal(18);
      lines?.forEach((line) => {
        expect(line.getPoint1().getLongitude()).is.greaterThanOrEqual(320);
        expect(line.getPoint1().getLongitude()).is.lessThanOrEqual(340);

        expect(line.getPoint1().getLatitude()).is.greaterThanOrEqual(-90);
        expect(line.getPoint1().getLatitude()).is.lessThanOrEqual(-70);
      });

      const labels = grid.getLabelsFromGridTile(tile);
      expect(labels?.length).to.equal(9);
      labels?.forEach((label) => {
        expect(label.getName()?.includes('E')).to.be.true;
        expect(label.getName()?.includes('S')).to.be.true;
      });
    }
  });
});
