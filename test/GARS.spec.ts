import { Point } from '@ngageoint/grid-js';
import { expect } from 'chai';
import { GARS } from '../lib/GARS';
import { GARSConstants } from '../lib/GARSConstants';

describe('GARS Tests', function () {

    /**
     * Test parsing a GARS string value
     * 
     * @throws ParseException
     *             upon failure to parse
     */
    it('test parse', function () {
        let garsValue = "001AA";
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
        //expect(gars2).to.equal(gars);
        //expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT
        //    + GARSConstants.DEFAULT_KEYPAD);

        garsValue = "001AW";
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
        //expect(gars2).to.equal(gars);
       // expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT
        //    + GARSConstants.DEFAULT_KEYPAD);

        garsValue = "001QZ";
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
        //expect(gars2).to.equal(gars);
        //expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT
        //    + GARSConstants.DEFAULT_KEYPAD);

        garsValue = "001QD";
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
        //expect(gars2).to.equal(gars);
        //expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT
        //    + GARSConstants.DEFAULT_KEYPAD);

        garsValue = "720AA";
        expect(GARS.isGARS(garsValue)).to.be.true;
        gars = GARS.parse(garsValue);
        expect(gars.getLongitude()).to.equal(720);
        expect(gars.getLatitude()).to.equal('AA');
        expect(gars.getQuadrant()).to.equal(GARSConstants.DEFAULT_QUADRANT)
        expect(gars.getKeypad()).to.equal(GARSConstants.DEFAULT_KEYPAD);
        point = gars.toPoint();
        expect(point.getLongitude()).to.be.approximately(179.5, 0);
        expect(point.getLatitude()).to.be.approximately(-90.0, 0);
        gars2 = GARS.fromPoint(point);
        //expect(gars2).to.equal(gars);
        //expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT
         //   + GARSConstants.DEFAULT_KEYPAD);

        garsValue = "720AW";
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
        //expect(gars2).to.equal(gars);
        //expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT
        //    + GARSConstants.DEFAULT_KEYPAD);

        garsValue = "720QZ";
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
        //expect(gars2).to.equal(gars);
       // expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT
        //    + GARSConstants.DEFAULT_KEYPAD);

        garsValue = "720QD";
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
        //expect(gars2).to.equal(gars);
       // expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT
        //    + GARSConstants.DEFAULT_KEYPAD);

        garsValue = "006AG";
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
        //expect(gars2).to.equal(gars);
        //expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_QUADRANT
       //     + GARSConstants.DEFAULT_KEYPAD);

        garsValue = "006AG3";
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
        //expect(gars2).to.equal(gars);
        //expect(gars2.coordinate()).to.equal(garsValue + GARSConstants.DEFAULT_KEYPAD);

        garsValue = "006AG39";
        expect(GARS.isGARS(garsValue)).to.be.true;
        gars = GARS.parse(garsValue);
        expect(gars.getLongitude()).to.equal(6);
        expect(gars.getLatitude()).to.equal('AG');
        expect(gars.getQuadrant()).to.equal(3);
        expect(gars.getKeypad()).to.equal(9);
        point = gars.toPoint();
        expect(point.getLongitude()).to.be.approximately(-177.3333333, 0.000001);
        expect(point.getLatitude()).to.be.approximately(-87.0, 0);
        gars2 = GARS.fromPoint(Point.point(point.getLongitude() + 0.000001,
            point.getLatitude()));
        //expect(gars2).to.equal(gars);
        //expect(gars2.coordinate()).to.equal(garsValue);

        garsValue = "006AG25";
        expect(GARS.isGARS(garsValue)).to.be.true;
        gars = GARS.parse(garsValue);
        expect(gars.getLongitude()).to.equal(6);
        expect(gars.getLatitude()).to.equal('AG');
        expect(gars.getQuadrant()).to.equal(2);
        expect(gars.getKeypad()).to.equal(5);
        point = gars.toPoint();
        expect(point.getLongitude()).to.be.approximately(-177.1666667, 0.000001);
        expect(point.getLatitude()).to.be.approximately(-86.6666667, 0.000001);
        gars2 = GARS.fromPoint(Point.point(point.getLongitude(),
            point.getLatitude() + 0.000001));
        //expect(gars2).to.equal(gars);
        //expect(gars2.coordinate()).to.equal(garsValue);
    });

    /**
	 * Test parsing an invalid GARS string value
	 */
     it('test parse invalid', function () {
        expect(GARS.isGARS("1AA")).to.be.false;
		expect(GARS.isGARS("01AA")).to.be.false;
		expect(GARS.isGARS("001A")).to.be.false;
		expect(GARS.isGARS("000AA")).to.be.false;
		expect(GARS.isGARS("721AA")).to.be.false;
		expect(GARS.isGARS("001RA")).to.be.false;
		expect(GARS.isGARS("720ZZ")).to.be.false;
		expect(GARS.isGARS("000AG3")).to.be.false;
		expect(GARS.isGARS("721AG3")).to.be.false;
		expect(GARS.isGARS("006RA3")).to.be.false;
		expect(GARS.isGARS("006ZZ3")).to.be.false;
		expect(GARS.isGARS("000AG39")).to.be.false;
		expect(GARS.isGARS("721AG39")).to.be.false;
		expect(GARS.isGARS("006RA39")).to.be.false;
		expect(GARS.isGARS("006ZZ39")).to.be.false;
		expect(GARS.isGARS("006AG09")).to.be.false;
		expect(GARS.isGARS("006AG59")).to.be.false;
		expect(GARS.isGARS("006AG30")).to.be.false;
		expect(GARS.isGARS("006AG310")).to.be.false;
     });
});