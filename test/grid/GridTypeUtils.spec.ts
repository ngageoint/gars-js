import { expect } from 'chai';
import { GridTypeUtils } from '../../lib/grid/GridTypeUtils';
import { GridType } from '../../lib/grid/GridType';

describe('GridTypeUtils Tests', function () {
  it('test less precise', function () {
    const lessPreciseTypes = GridTypeUtils.lessPrecise(GridType.ONE_DEGREE);
    expect(lessPreciseTypes.size).to.be.equal(3);
  });

  it('test more precise', function () {
    const lessPreciseTypes = GridTypeUtils.lessPrecise(GridType.FIFTEEN_MINUTE);
    expect(lessPreciseTypes.size).to.be.equal(5);
  });

  it('test ordinal', function () {
    expect(GridTypeUtils.ordinal(GridType.TEN_DEGREE)).to.be.equal(1);
  });
});
