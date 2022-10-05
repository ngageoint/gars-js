import { expect } from 'chai';
import { BandNumberRange } from '../../lib/grid/BandNumberRange';

describe('BandNumberRange Tests', function () {
  it('test iterator', function () {
    const bandNumberRange = new BandNumberRange();
    expect(bandNumberRange.getEast()).to.be.greaterThan(0);
    expect(bandNumberRange.getWest()).to.be.greaterThan(0);

    let count = 0;
    for (const letter of bandNumberRange) {
      count++;
    }
    expect(count).to.be.greaterThanOrEqual(bandNumberRange.getEast());
  });
});
