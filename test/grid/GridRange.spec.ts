import { expect } from 'chai';
import { GARSConstants } from '../../lib/GARSConstants';
import { GridRange } from '../../lib/grid/GridRange';

describe('GridRange Tests', function () {
  it('test iterator', function () {
    const range = new GridRange();
    expect(range.getBandLettersRange()).to.not.be.undefined;
    expect(range.getBandNumberRange()).to.not.be.undefined;

    let count = 0;
    for (const gars of range) {
      count++;
    }
    expect(count).to.equal(GARSConstants.MAX_BAND_NUMBER * GARSConstants.MAX_BAND_LETTERS_NUMBER);
  });
});
