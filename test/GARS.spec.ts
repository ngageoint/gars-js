import { Point } from '@ngageoint/grid-js';
import { expect } from 'chai';
import { GARS } from '../lib/GARS';
import { GARSConstants } from '../lib/GARSConstants';
import { GARSUtils } from '../lib/GARSUtils';
import { GridRange } from '../lib/grid/GridRange';
import { GridType } from '../lib/grid/GridType';

describe('GARS Tests', function () {
  /**
   * Test parsing a GARS string value
   *
   * @throws ParseException
   *             upon failure to parse
   */
  it('test parse', function () {
    let garsValue = '001AA';
    expect(GARS.isGARS(garsValue)).to.be.true;
    let gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(1);
    expect(gars.getLatitude()).to.equal('AA');
    expect(gars.getQuadrant()).to.equal(GARSConstants.DEFAULT_QUADRANT);
    expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);
    let point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(-180.0, 0);
    expect(point.getLatitude()).to.be.approximately(-90.0, 0);
    let gars2 = GARS.fromPoint(point);
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT + GARSConstants.DEFAULT_KEYPAD);

    garsValue = '001AW';
    expect(GARS.isGARS(garsValue)).to.be.true;
    gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(1);
    expect(gars.getLatitude()).to.equal('AW');
    expect(gars.getQuadrant()).to.equal(GARSConstants.DEFAULT_QUADRANT);
    expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);
    point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(-180.0, 0);
    expect(point.getLatitude()).to.be.approximately(-80.0, 0);
    gars2 = GARS.fromPoint(point);
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT + GARSConstants.DEFAULT_KEYPAD);

    garsValue = '001QZ';
    expect(GARS.isGARS(garsValue)).to.be.true;
    gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(1);
    expect(gars.getLatitude()).to.equal('QZ');
    expect(gars.getQuadrant()).to.equal(GARSConstants.DEFAULT_QUADRANT);
    expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);
    point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(-180.0, 0);
    expect(point.getLatitude()).to.be.approximately(89.5, 0);
    gars2 = GARS.fromPoint(point);
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT + GARSConstants.DEFAULT_KEYPAD);

    garsValue = '001QD';
    expect(GARS.isGARS(garsValue)).to.be.true;
    gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(1);
    expect(gars.getLatitude()).to.equal('QD');
    expect(gars.getQuadrant()).to.equal(GARSConstants.DEFAULT_QUADRANT);
    expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);
    point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(-180.0, 0);
    expect(point.getLatitude()).to.be.approximately(79.5, 0);
    gars2 = GARS.fromPoint(point);
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT + GARSConstants.DEFAULT_KEYPAD);

    garsValue = '720AA';
    expect(GARS.isGARS(garsValue)).to.be.true;
    gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(720);
    expect(gars.getLatitude()).to.equal('AA');
    expect(gars.getQuadrant()).to.equal(GARSConstants.DEFAULT_QUADRANT);
    expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);
    point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(179.5, 0);
    expect(point.getLatitude()).to.be.approximately(-90.0, 0);
    gars2 = GARS.fromPoint(point);
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT + GARSConstants.DEFAULT_KEYPAD);

    garsValue = '720AW';
    expect(GARS.isGARS(garsValue)).to.be.true;
    gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(720);
    expect(gars.getLatitude()).to.equal('AW');
    expect(gars.getQuadrant()).to.equal(GARSConstants.DEFAULT_QUADRANT);
    expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);
    point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(179.5, 0);
    expect(point.getLatitude()).to.be.approximately(-80.0, 0);
    gars2 = GARS.fromPoint(point);
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT + GARSConstants.DEFAULT_KEYPAD);

    garsValue = '720QZ';
    expect(GARS.isGARS(garsValue)).to.be.true;
    gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(720);
    expect(gars.getLatitude()).to.equal('QZ');
    expect(gars.getQuadrant()).to.equal(GARSConstants.DEFAULT_QUADRANT);
    expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);
    point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(179.5, 0);
    expect(point.getLatitude()).to.be.approximately(89.5, 0);
    gars2 = GARS.fromPoint(point);
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT + GARSConstants.DEFAULT_KEYPAD);

    garsValue = '720QD';
    expect(GARS.isGARS(garsValue)).to.be.true;
    gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(720);
    expect(gars.getLatitude()).to.equal('QD');
    expect(gars.getQuadrant()).to.equal(GARSConstants.DEFAULT_QUADRANT);
    expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);
    point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(179.5, 0);
    expect(point.getLatitude()).to.be.approximately(79.5, 0);
    gars2 = GARS.fromPoint(point);
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT + GARSConstants.DEFAULT_KEYPAD);

    garsValue = '006AG';
    expect(GARS.isGARS(garsValue)).to.be.true;
    gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(6);
    expect(gars.getLatitude()).to.equal('AG');
    expect(gars.getQuadrant()).to.equal(GARSConstants.DEFAULT_QUADRANT);
    expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);
    point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(-177.5, 0);
    expect(point.getLatitude()).to.be.approximately(-87.0, 0);
    gars2 = GARS.fromPoint(point);
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT + GARSConstants.DEFAULT_KEYPAD);

    garsValue = '006AG3';
    expect(GARS.isGARS(garsValue)).to.be.true;
    gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(6);
    expect(gars.getLatitude()).to.equal('AG');
    expect(gars.getQuadrant()).to.equal(3);
    expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);
    point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(-177.5, 0);
    expect(point.getLatitude()).to.be.approximately(-87.0, 0);
    gars2 = GARS.fromPoint(point);
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_KEYPAD);

    garsValue = '006AG39';
    expect(GARS.isGARS(garsValue)).to.be.true;
    gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(6);
    expect(gars.getLatitude()).to.equal('AG');
    expect(gars.getQuadrant()).to.equal(3);
    expect(gars.getKeypad()).to.equal(9);
    point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(-177.3333333, 0.000001);
    expect(point.getLatitude()).to.be.approximately(-87.0, 0);
    gars2 = GARS.fromPoint(Point.point(point.getLongitude() + 0.000001, point.getLatitude()));
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue);

    garsValue = '006AG25';
    expect(GARS.isGARS(garsValue)).to.be.true;
    gars = GARS.parse(garsValue);
    expect(gars.getLongitude()).to.equal(6);
    expect(gars.getLatitude()).to.equal('AG');
    expect(gars.getQuadrant()).to.equal(2);
    expect(gars.getKeypad()).to.equal(5);
    point = gars.toPoint();
    expect(point.getLongitude()).to.be.approximately(-177.1666667, 0.000001);
    expect(point.getLatitude()).to.be.approximately(-86.6666667, 0.000001);
    gars2 = GARS.fromPoint(Point.point(point.getLongitude(), point.getLatitude() + 0.000001));
    expect(gars2.equals(gars)).to.be.true;
    expect(gars2.coordinate()).to.equal(garsValue);
  });

  /**
   * Test parsing an invalid GARS string value
   */
  it('test parse invalid', function () {
    expect(GARS.isGARS('1AA')).to.be.false;
    expect(GARS.isGARS('01AA')).to.be.false;
    expect(GARS.isGARS('001A')).to.be.false;
    expect(GARS.isGARS('000AA')).to.be.false;
    expect(GARS.isGARS('721AA')).to.be.false;
    expect(GARS.isGARS('001RA')).to.be.false;
    expect(GARS.isGARS('720ZZ')).to.be.false;
    expect(GARS.isGARS('000AG3')).to.be.false;
    expect(GARS.isGARS('721AG3')).to.be.false;
    expect(GARS.isGARS('006RA3')).to.be.false;
    expect(GARS.isGARS('006ZZ3')).to.be.false;
    expect(GARS.isGARS('000AG39')).to.be.false;
    expect(GARS.isGARS('721AG39')).to.be.false;
    expect(GARS.isGARS('006RA39')).to.be.false;
    expect(GARS.isGARS('006ZZ39')).to.be.false;
    expect(GARS.isGARS('006AG09')).to.be.false;
    expect(GARS.isGARS('006AG59')).to.be.false;
    expect(GARS.isGARS('006AG30')).to.be.false;
    expect(GARS.isGARS('006AG310')).to.be.false;
  });

  /**
   * Test parsing a GARS string value
   *
   * @throws ParseException
   *             upon failure to parse
   */
  it('test coordinate', function () {
    let gars = '419NV11';
    testCoordinate(29.06757, 63.98863, gars);
    testCoordinateMeters(3235787.09, 9346877.48, gars);

    gars = '468JN14';
    testCoordinate(53.51, 12.4, gars);
    testCoordinateMeters(5956705.95, 1391265.16, gars);

    gars = '045KG17';
    testCoordinate(-157.916861, 21.309444, gars);
    testCoordinateMeters(-17579224.55, 2428814.96, gars);

    gars = '395JE45';
    testCoordinate(17.3714337, 8.1258235, gars);
    testCoordinateMeters(1933779.15, 907610.2, gars);

    gars = '204LQ37';
    testCoordinate(-78.5, 37.0, gars);
    testCoordinateMeters(-8738580.027271975, 4439106.787250587, gars);

    gars = '204LQ27';
    testCoordinateFromPoint(Point.point(-78.25, 37.25), gars);
    testCoordinateMeters(-8710750.154573657, 4474011.088229478, gars);

    gars = '204LQ25';
    testCoordinate(-78.16666666, 37.33333334, gars);
    testCoordinateMeters(-8701473.529598756, 4485671.563830873, gars);

    gars = '204LQ23';
    testCoordinate(-78.08333333, 37.41666667, gars);
    testCoordinateMeters(-8692196.905737048, 4497344.980476594, gars);
  });

  /**
   * Test parsing 30 minute full range
   *
   * @throws ParseException
   *             upon failure to parse
   */
  it('test 30 minute parse', function () {
    this.timeout(20000);
    const gridRange = new GridRange();

    let count = 0;

    let number = GARSConstants.MIN_BAND_NUMBER;
    let letters = GARSConstants.MIN_BAND_LETTERS_NUMBER;
    let lon = GARSConstants.MIN_LON;
    let lat = GARSConstants.MIN_LAT;

    for (const gars of gridRange) {
      const bandNumber = gars.getLongitude();
      const bandLetters = gars.getLatitude();

      expect(bandNumber).to.equal(number);
      expect(bandLetters).to.equal(GARSUtils.bandLetters(letters));
      expect(gars.getQuadrant()).to.equal(GARSConstants.DEFAULT_QUADRANT);
      expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);

      const point = gars.toPoint();

      expect(point.getLongitude()).to.be.approximately(lon, 0);
      expect(point.getLatitude()).to.be.approximately(lat, 0);

      letters++;
      lat += GridType.THIRTY_MINUTE;
      if (letters > GARSConstants.MAX_BAND_LETTERS_NUMBER) {
        letters = GARSConstants.MIN_BAND_LETTERS_NUMBER;
        lat = GARSConstants.MIN_LAT;
        number++;
        lon += GridType.THIRTY_MINUTE;
      }

      count++;
    }

    expect(count).to.equal(GARSConstants.MAX_BAND_NUMBER * GARSConstants.MAX_BAND_LETTERS_NUMBER);
  });

  /**
   * Test the WGS84 coordinate with expected GARS coordinate
   *
   * @param longitude
   *            longitude in degrees
   * @param latitude
   *            latitude in degrees
   * @param value
   *            GARS value
   * @throws ParseException
   *             upon failure to parse
   */
  function testCoordinate(longitude: number, latitude: number, value: string): void {
    const point = Point.point(longitude, latitude);
    testCoordinateFromPoint(point, value);
    testCoordinateFromPoint(point.toMeters(), value);
  }

  /**
   * Test the WGS84 coordinate with expected GARS coordinate
   *
   * @param longitude
   *            longitude in degrees
   * @param latitude
   *            latitude in degrees
   * @param value
   *            GARS value
   * @throws ParseException
   *             upon failure to parse
   */
  function testCoordinateMeters(longitude: number, latitude: number, value: string): void {
    const point = Point.meters(longitude, latitude);
    testCoordinateFromPoint(point, value);
    testCoordinateFromPoint(point.toDegrees(), value);
  }

  /**
   * Test the coordinate with expected GARS coordinate
   *
   * @param point
   *            point
   * @param value
   *            GARS value
   * @throws ParseException
   *             upon failure to parse
   */
  function testCoordinateFromPoint(point: Point, value: string): void {
    const gars = GARS.fromPoint(point);
    expect(gars.toString()).to.equal(value);
    expect(gars.coordinate()).to.equal(value);
    expect(gars.coordinate(GridType.FIVE_MINUTE)).to.equal(value);
    expect(gars.coordinate()).to.equal(value);

    expect(gars.coordinate(GridType.TWENTY_DEGREE)).to.equal(value.substring(0, 5));
    expect(gars.coordinate(GridType.TEN_DEGREE)).to.equal(value.substring(0, 5));
    expect(gars.coordinate(GridType.FIVE_DEGREE)).to.equal(value.substring(0, 5));
    expect(gars.coordinate(GridType.ONE_DEGREE)).to.equal(value.substring(0, 5));
    expect(gars.coordinate(GridType.THIRTY_MINUTE)).to.equal(value.substring(0, 5));
    expect(gars.coordinate(GridType.FIFTEEN_MINUTE)).to.equal(value.substring(0, 6));
  }
});
