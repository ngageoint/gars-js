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
});
