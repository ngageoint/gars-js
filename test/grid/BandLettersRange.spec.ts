import { expect } from 'chai';
import { BandLettersRange } from '../../lib/grid/BandLettersRange';

describe('BandLettersRange Tests', function () {
  it('test iterator', function () {
    const bandLettersRange = new BandLettersRange();
    expect(bandLettersRange.getSouthValue()).to.be.greaterThan(0);
    expect(bandLettersRange.getNorthValue()).to.be.greaterThan(0);

    let count = 0;
    for (const letter of bandLettersRange) {
      count++;
    }
    expect(count).to.be.greaterThanOrEqual(bandLettersRange.getNorthValue());
  });
});
