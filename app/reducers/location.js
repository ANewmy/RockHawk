import {
    INIT_POSITION,
    TRAILS_CLICKED,
    HOT_SPOT_CLICKED,
    ACTIVITIES_CLICKED,
    FACILITIES_CLICKED,
    SAVE_LOCATION_DATA,
    SAVE_TRAIL_DATA,
    UPDATE_LOCATION_LIST,
    HOT_SPOT_ENTERED,
} from '../actions/location';

const initialState = {
    coords: {},
    deltas: {
        latitudeDelta: 0.00103,
        longitudeDelta: 0.0094,
    },
    hotSpotClicked: false,
    trailsClicked: false,
    activitiesClicked: false,
    facilitiesClicked: false,
    locationData: [],
    trailData: [],
    locationList: new Array(),
    currentHotSpot: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_POSITION:
            return {
                ...state,
                coords: action.coords,
            };

            break;

        case HOT_SPOT_ENTERED:
            return {
                ...state,
                currentHotSpot: action.location,
            };

            break;

        case SAVE_LOCATION_DATA:
            return {
                ...state,
                locationData: action.locationData,
            };

            break;

        case SAVE_TRAIL_DATA:
            return {
                ...state,
                trailData: action.trailData,
            };

            break;

        case HOT_SPOT_CLICKED:
            return {
                ...state,
                hotSpotClicked: action.bool,
            };

            break;

        case TRAILS_CLICKED:
            return {
                ...state,
                trailsClicked: action.bool,
            };

            break;

        case ACTIVITIES_CLICKED:
            return {
                ...state,
                activitiesClicked: action.bool,
            };

            break;

        case FACILITIES_CLICKED:
            return {
                ...state,
                facilitiesClicked: action.bool,
            };

            break;

        case UPDATE_LOCATION_LIST:
            return {
                ...state,
                locationList: state.locationList.concat(action.location),
            };

            break;
        default:
            return state;
    }
};
