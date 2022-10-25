import { expect } from 'chai';
import { Bounds } from '@ngageoint/grid-js';
import { GARSLabeler } from '../../lib/grid/GARSLabeler';
import { GridType } from '../../lib/grid/GridType';

describe('GARSLabeler Tests', function () {
  it('test getLabels', function () {
    const boundsIndia = Bounds.degrees(69, 7, 98, 38);

    const labeler = new GARSLabeler(true);
    let labels = labeler.getLabels(boundsIndia, GridType.TWENTY_DEGREE);
    expect(labels.length).to.be.equal(9);
    labels.forEach((label) => {
      expect(label.getName()?.includes('E')).to.be.true;
      expect(label.getName()?.includes('N')).to.be.true;
    });

    labels = labeler.getLabels(boundsIndia, GridType.TEN_DEGREE);
    expect(labels.length).to.be.equal(25);
    labels.forEach((label) => {
      expect(label.getName()?.includes('E')).to.be.true;
      expect(label.getName()?.includes('N')).to.be.true;
    });

    labels = labeler.getLabels(boundsIndia, GridType.FIVE_DEGREE);
    expect(labels.length).to.be.equal(64);
    labels.forEach((label) => {
      expect(label.getName()?.includes('E')).to.be.true;
      expect(label.getName()?.includes('N')).to.be.true;
    });

    labels = labeler.getLabels(boundsIndia, GridType.ONE_DEGREE);
    expect(labels.length).to.be.equal(1023);
    labels.forEach((label) => {
      expect(label.getName()?.includes('E')).to.be.true;
      expect(label.getName()?.includes('N')).to.be.true;
    });
  });
});
