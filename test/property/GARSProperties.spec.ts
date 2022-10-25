import { expect } from 'chai';
import { GARSProperties } from '../../lib/property/GARSProperties';

describe('GARSProperties Tests', function () {
  it('test GARS property', function () {
    const prop = GARSProperties.getInstance().getBooleanProperty(
      true,
      GARSProperties.getInstance().buildProperty(['grids', 'twenty_degree', 'enabled']),
    );
    expect(prop).to.be.true;
  });

  it('test Grid property', function () {
    const prop = GARSProperties.getInstance().getBooleanProperty(
      true,
      GARSProperties.getInstance().buildProperty(['grids', 'propagate']),
    );
    expect(prop).to.be.true;
  });
});
