import { GridStyle } from '@ngageoint/grid-js';
import { expect } from 'chai';
import { Grid } from '../../lib/grid/Grid';
import { GridType } from '../../lib/grid/GridType';

describe('Grid Tests', function () {
  it('test precision', function () {
    const grid = new Grid(GridType.ONE_DEGREE);
    expect(grid.getPrecision()).to.equal(GridType.ONE_DEGREE);
  });

  it('test style', function () {
    const grid = new Grid(GridType.THIRTY_MINUTE);
    expect(grid.getStyle()).to.not.be.undefined;

    expect(function () {
      grid.setStyle(new GridStyle(undefined, 0), GridType.FIFTEEN_MINUTE);
    }).to.throw(Error);
  });

  it('test equals', function () {
    const grid = new Grid(GridType.ONE_DEGREE);
    const grid2 = new Grid(GridType.ONE_DEGREE);
    expect(grid.equals(grid2)).to.be.true;
  });
});
