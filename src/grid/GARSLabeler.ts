import { Bounds } from "@ngageoint/grid-js";
import { GARS } from "../GARS";
import { GARSUtils } from "../GARSUtils";
import { GridLabel } from "./GridLabel";
import { GridLabeler } from "./GridLabeler";
import { GridType } from "./GridType";

/**
 * GARS grid labeler
 * 
 * @author osbornb
 */
export class GARSLabeler extends GridLabeler {

    /**
     * Default Constructor
     */
    public GARSLabeler() {
        super();
    }

    /**
     * Constructor
     * 
     * @param minZoom
     *            minimum zoom
     * @param color
     *            label color
     */
    public GARSLabeler(int minZoom, Color color) {
        super(minZoom, color);
    }

    /**
     * Constructor
     * 
     * @param minZoom
     *            minimum zoom
     * @param color
     *            label color
     * @param textSize
     *            label text size
     */
    public GARSLabeler(int minZoom, Color color, double textSize) {
        super(minZoom, color, textSize);
    }

    /**
     * Constructor
     * 
     * @param minZoom
     *            minimum zoom
     * @param color
     *            label color
     * @param textSize
     *            label text size
     * @param buffer
     *            grid edge buffer (greater than or equal to 0.0 and less than
     *            0.5)
     */
    public GARSLabeler(int minZoom, Color color, double textSize,
        double buffer) {
        super(minZoom, color, textSize, buffer);
    }

    /**
     * Constructor
     * 
     * @param minZoom
     *            minimum zoom
     * @param maxZoom
     *            maximum zoom
     * @param color
     *            label color
     */
    public GARSLabeler(int minZoom, Integer maxZoom, Color color) {
        super(minZoom, maxZoom, color);
    }

    /**
     * Constructor
     * 
     * @param minZoom
     *            minimum zoom
     * @param maxZoom
     *            maximum zoom
     * @param color
     *            label color
     * @param textSize
     *            label text size
     */
    public GARSLabeler(int minZoom, Integer maxZoom, Color color,
        double textSize) {
        super(minZoom, maxZoom, color, textSize);
    }

    /**
     * Constructor
     * 
     * @param minZoom
     *            minimum zoom
     * @param maxZoom
     *            maximum zoom
     * @param color
     *            label color
     * @param textSize
     *            label text size
     * @param buffer
     *            grid edge buffer (greater than or equal to 0.0 and less than
     *            0.5)
     */
    public GARSLabeler(int minZoom, Integer maxZoom, Color color,
        double textSize, double buffer) {
        super(minZoom, maxZoom, color, textSize, buffer);
    }

    /**
     * Constructor
     * 
     * @param enabled
     *            enabled labeler
     * @param minZoom
     *            minimum zoom
     * @param maxZoom
     *            maximum zoom
     * @param color
     *            label color
     */
    public GARSLabeler(boolean enabled, int minZoom, Integer maxZoom,
        Color color) {
        super(enabled, minZoom, maxZoom, color);
    }

    /**
     * Constructor
     * 
     * @param enabled
     *            enabled labeler
     * @param minZoom
     *            minimum zoom
     * @param maxZoom
     *            maximum zoom
     * @param color
     *            label color
     * @param textSize
     *            label text size
     */
    public GARSLabeler(boolean enabled, int minZoom, Integer maxZoom,
        Color color, double textSize) {
        super(enabled, minZoom, maxZoom, color, textSize);
    }

    /**
     * Constructor
     * 
     * @param enabled
     *            enabled labeler
     * @param minZoom
     *            minimum zoom
     * @param maxZoom
     *            maximum zoom
     * @param color
     *            label color
     * @param textSize
     *            label text size
     * @param buffer
     *            grid edge buffer (greater than or equal to 0.0 and less than
     *            0.5)
     */
    public GARSLabeler(boolean enabled, int minZoom, Integer maxZoom,
        Color color, double textSize, double buffer) {
        super(enabled, minZoom, maxZoom, color, textSize, buffer);
    }

    /**
     * {@inheritDoc}
     */
    public getLabels(tileBounds: Bounds, gridType: GridType): GridLabel[] {

        const labels: GridLabel[] = [];

        tileBounds = tileBounds.toPrecision(gridType);

        for (let lon = tileBounds.getMinLongitude(); lon <= tileBounds
            .getMaxLongitude(); lon = GARSUtils.nextPrecision(lon,
                gridType)) {

            for (let lat = tileBounds.getMinLatitude(); lat <= tileBounds
                .getMaxLatitude(); lat = GARSUtils.nextPrecision(lat,
                    gridType)) {

                const bounds = Bounds.degrees(lon, lat, lon + gridType,
                    lat + gridType);
                const center = bounds.getCentroid();
                const coordinate = GARS.fromPoint(center);

                let name: string | null = null;

                switch (gridType) {
                    case GridType.TWENTY_DEGREE:
                    case GridType.TEN_DEGREE:
                    case GridType.FIVE_DEGREE:
                    case GridType.ONE_DEGREE: 
                        name = GARSUtils.getDegreeLabel(lon, lat);
                        break;
                    default:
                        name = coordinate.coordinate(gridType);
                }

                labels.push(new GridLabel(name, center, bounds, gridType,
                    coordinate));

            }
        }

        return labels;
    }

}
