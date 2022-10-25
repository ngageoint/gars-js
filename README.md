# GARS Javascript

![Build & Test](https://github.com/ngageoint/gars-js/actions/workflows/build-test.yml/badge.svg)
[![NPM](https://img.shields.io/npm/v/@ngageoint/gars-js.svg)](https://www.npmjs.com/package/@ngageoint/gars-js)
[![Coverage Status](https://coveralls.io/repos/github/ngageoint/gars-js/badge.svg)](https://coveralls.io/github/ngageoint/gars-js)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

#### Global Area Reference System Lib ####

The GARS Library was developed at the [National Geospatial-Intelligence Agency (NGA)](http://www.nga.mil/) in collaboration with [BIT Systems](https://www.caci.com/bit-systems/). The government has "unlimited rights" and is releasing this software to increase the impact of government investments by providing developers with the opportunity to take things in new directions. The software use, modification, and distribution rights are stipulated within the [MIT license](http://choosealicense.com/licenses/mit/).

### Pull Requests ###
If you'd like to contribute to this project, please make a pull request. We'll review the pull request and discuss the changes. All pull request contributions to this project will be released under the MIT license.

Software source code previously released under an open source license and then modified by NGA staff is considered a "joint work" (see 17 USC § 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open source license.

### About ###

[GARS](http://ngageoint.github.io/gars-js/) is a Javascript library providing Global Area Reference System functionality, a standardized geospatial reference system for areas.

#### Properties ####

Default grid properties including zoom ranges, styles, and labelers are defined in [gars.properties](https://github.com/ngageoint/gars-js/blob/master/resources/gars.properties). The defaults can be changed in code by modifying the [Grids](https://github.com/ngageoint/gars-js/blob/master/lib/grid/Grids.ts).

#### Coordinates ####

```javascript

 const gars = GARS.parse('006AG39');
 const point = gars.toPoint();
 const pointMeters = point.toMeters();

 const latitude = 63.98862388;
 const longitude = 29.06755082;
 const point2 = Point.point(longitude, latitude);
 const gars2 = GARS.fromPoint(point2);
 const garsCoordinate = gars2.toString();
 const gars30m = gars2.coordinate(GridType.THIRTY_MINUTE);
 const gars15m = gars2.coordinate(GridType.FIFTEEN_MINUTE);
 const gars5m = gars2.coordinate(GridType.FIVE_MINUTE);

```

#### Draw Tile Template ####

See [gars-android](https://github.com/ngageoint/gars-android) for a concrete example

```javascript

  // GridTile tile = ...;

  const grids = Grids.create();

  const zoomGrids = grids.getGrids(tile.getZoom());
  if (zoomGrids && zoomGrids.hasGrids()) {
    for (const grid of zoomGrids) {
      const lines = grid.getLinesFromGridTile(tile);
      if (lines) {
        for (const line of lines) {
          const pixel1 = line.getPoint1().getPixelFromTile(tile);
          const pixel2 = line.getPoint2().getPixelFromTile(tile);
          // Draw line
        }
      }

      const labels = grid.getLabelsFromGridTile(tile);
      if (labels) {
        for (const label of labels) {
          const pixelRange = label.getBounds()!.getPixelRangeFromTile(tile);
          const centerPixel = label.getCenter()!.getPixelFromTile(tile);
          // Draw label
        }
      }
    }
  }

```


### Remote Dependencies ###

* [Grid Javascript](https://github.com/ngageoint/grid-js) (The MIT License (MIT)) - Grid Library