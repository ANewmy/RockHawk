import {
    INIT_POSITION,
    INCREASE_MAP_SIZE,
    DECREASE_MAP_SIZE,
    HOT_SPOT_CLICKED,
    TRAILS_CLICKED,
    ACTIVITIES_CLICKED,
    FACILITIES_CLICKED
} from '../actions/location';

const initialState = {
    coords: {},
    deltas: {
        latitudeDelta: 0.00103,
        longitudeDelta: 0.0094
    },
    hotSpotClicked: false,
    trailsClicked: false,
    activitiesClicked: false,
    facilitiesClicked: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_POSITION:
            return {
                ...state,
                coords: action.coords
            };

            break;

        case INCREASE_MAP_SIZE:
            return {
                ...state,
                deltas: {
                    latitudeDelta: state.deltas.latitudeDelta + 0.0015,
                    longitudeDelta: state.deltas.longitudeDelta + 0.0015
                }
            };

            break;

        case DECREASE_MAP_SIZE:
            return {
                ...state,
                deltas: {
                    latitudeDelta: state.deltas.latitudeDelta - 0.0015,
                    longitudeDelta: state.deltas.longitudeDelta - 0.0015
                }
            };

            break;

        case HOT_SPOT_CLICKED:
            return {
                ...state,
                hotSpotClicked: action.bool
            };

            break;

        case TRAILS_CLICKED:
            return {
                ...state,
                trailsClicked: action.bool
            };

            break;

        case ACTIVITIES_CLICKED:
            return {
                ...state,
                activitiesClicked: action.bool
            };

            break;

        case FACILITIES_CLICKED:
            return {
                ...state,
                facilitiesClicked: action.bool
            };

            break;
        default:
            return state;
    }
};
