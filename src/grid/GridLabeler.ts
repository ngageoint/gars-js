import { Color } from "@ngageoint/color-js";
import { Bounds, PropertyConstants } from "@ngageoint/grid-js";

/**
 * Grid Labeler
 * 
 * @author osbornb
 */
export abstract class GridLabeler extends Labeler {

    /**
     * Default text size
     */
    public static readonly DEFAULT_TEXT_SIZE = GARSProperties.getInstance()
        .getDoubleProperty(PropertyConstants.LABELER,
            PropertyConstants.TEXT_SIZE);

    /**
     * Default buffer size
     */
    public static readonly DEFAULT_BUFFER = GARSProperties.getInstance()
        .getDoubleProperty(PropertyConstants.LABELER,
            PropertyConstants.BUFFER);

    /**
     * Default Constructor
     */
    public GridLabeler() {
        super(true, 0, null, Color.black(), DEFAULT_TEXT_SIZE, DEFAULT_BUFFER);
    }

    /**
     * Constructor
     * 
     * @param minZoom
     *            minimum zoom
     * @param color
     *            label color
     */
    public GridLabeler(int minZoom, Color color) {
        this(minZoom, color, DEFAULT_TEXT_SIZE);
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
    public GridLabeler(int minZoom, Color color, double textSize) {
        super(minZoom, color, textSize, DEFAULT_BUFFER);
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
    public GridLabeler(int minZoom, Color color, double textSize,
        double buffer) {
        super(minZoom, null, color, textSize, buffer);
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
    public GridLabeler(int minZoom, Integer maxZoom, Color color) {
        this(minZoom, maxZoom, color, DEFAULT_TEXT_SIZE);
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
    public GridLabeler(int minZoom, Integer maxZoom, Color color,
        double textSize) {
        super(minZoom, maxZoom, color, textSize, DEFAULT_BUFFER);
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
    public GridLabeler(int minZoom, Integer maxZoom, Color color,
        double textSize, double buffer) {
        super(true, minZoom, maxZoom, color, textSize, buffer);
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
    public GridLabeler(boolean enabled, int minZoom, Integer maxZoom,
        Color color) {
        this(enabled, minZoom, maxZoom, color, DEFAULT_TEXT_SIZE);
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
    public GridLabeler(boolean enabled, int minZoom, Integer maxZoom,
        Color color, double textSize) {
        super(enabled, minZoom, maxZoom, color, textSize, DEFAULT_BUFFER);
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
    public GridLabeler(boolean enabled, int minZoom, Integer maxZoom,
        Color color, double textSize, double buffer) {
        super(enabled, minZoom, maxZoom, color, textSize, buffer);
    }

    /**
     * Get labels for the bounds
     * 
     * @param tileBounds
     *            tile bounds
     * @param gridType
     *            grid type
     * @return labels
     */
    public abstract getLabels(tileBounds: Bounds,
        gridType: GridType): GridLabel[];

}
