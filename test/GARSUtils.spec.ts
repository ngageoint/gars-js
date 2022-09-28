import { expect } from 'chai';
import { GARSUtils } from '../lib/GARSUtils';

describe('GARSUtils Tests', function () {
  it('test band value', function () {
    expect(GARSUtils.bandValue('A')).to.equal(1);
    expect(GARSUtils.bandValue('Z')).to.equal(24);
    expect(GARSUtils.bandValue('AA')).to.equal(1);
    expect(GARSUtils.bandValue('QZ')).to.equal(360);
  });
});
