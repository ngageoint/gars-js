import { Point } from '@ngageoint/grid-js';
import { expect } from 'chai';
import { GridLine } from '../../lib/features/GridLine';
import { GridType } from '../../lib/grid/GridType';

describe('GridLine Tests', function () {

    it('test copy', function () {
        const gridLine = new GridLine();
        gridLine.setGridType(GridType.FIVE_MINUTE);
        const point1 = Point.point(0, 0);
        const point2 = Point.point(1, 1);
        gridLine.setPoints(point1, point2);

        const gridLineCopy = gridLine.copy();
        expect(gridLineCopy.getGridType()).to.equal(gridLine.getGridType());
        expect(gridLineCopy.numPoints()).to.equal(gridLineCopy.numPoints());
        expect(gridLineCopy.equals(gridLine)).to.be.true;
    });

    it('test create from line', function () {
        const point1 = Point.point(0, 0);
        const point2 = Point.point(1, 1);
        const gridType = GridType.TWENTY_DEGREE;
        const gridLine = GridLine.line(point1, point2, gridType);
        expect(gridLine.numPoints()).to.equal(2);
        expect(gridLine.getGridType()).to.equal(gridType);
    });
});