import { expect } from 'chai';
import { GARSUtils } from '../lib/GARSUtils';

describe('GARSUtils Tests', function () {
  /**
   * Test latitude band number values
   */
  it('test band value', function () {
    expect(GARSUtils.bandValue('A')).to.equal(1);
    expect(GARSUtils.bandValue('Z')).to.equal(24);
    expect(GARSUtils.bandValue('AA')).to.equal(1);
    expect(GARSUtils.bandValue('QZ')).to.equal(360);
  });

  /**
   * Test latitude band letters
   */
  it('test band letters', function () {
    expect(GARSUtils.bandLetter(1)).to.equal('A');
    expect(GARSUtils.bandLetter(24)).to.equal('Z');
    expect(GARSUtils.bandLetters(1)).to.equal('AA');
    expect(GARSUtils.bandLetters(24)).to.equal('AZ');
    expect(GARSUtils.bandLetters(25)).to.equal('BA');
    expect(GARSUtils.bandLetters(336)).to.equal('PZ');
    expect(GARSUtils.bandLetters(337)).to.equal('QA');
    expect(GARSUtils.bandLetters(360)).to.equal('QZ');
  });

  /**
   * Test quadrants
   */
  it('test quadrants', function () {
    expect(GARSUtils.quadrant(0, 1)).to.equal(1);
    expect(GARSUtils.quadrant(1, 1)).to.equal(2);
    expect(GARSUtils.quadrant(0, 0)).to.equal(3);
    expect(GARSUtils.quadrant(1, 0)).to.equal(4);
  });

  /**
   * Test keypad
   */
  it('test keypad', function () {
    expect(GARSUtils.keypad(0, 2)).to.equal(1);
    expect(GARSUtils.keypad(1, 2)).to.equal(2);
    expect(GARSUtils.keypad(2, 2)).to.equal(3);
    expect(GARSUtils.keypad(0, 1)).to.equal(4);
    expect(GARSUtils.keypad(1, 1)).to.equal(5);
    expect(GARSUtils.keypad(2, 1)).to.equal(6);
    expect(GARSUtils.keypad(0, 0)).to.equal(7);
    expect(GARSUtils.keypad(1, 0)).to.equal(8);
    expect(GARSUtils.keypad(2, 0)).to.equal(9);
  });
});
