export const INIT_POSITION = 'INIT_POSITION';
export const INCREASE_MAP_SIZE = 'INCREASE_MAP_SIZE';
export const DECREASE_MAP_SIZE = 'DECREASE_MAP_SIZE';
export const TRAILS_CLICKED = 'TRAILS_CLICKED';
export const HOT_SPOT_CLICKED = 'HOT_SPOT_CLICKED';
export const ACTIVITIES_CLICKED = 'ACTIVITIES_CLICKED';
export const FACILITIES_CLICKED = 'FACILITIES_CLICKED';

export const initPosition = coords => ({
    type: INIT_POSITION,
    coords: coords
});

export const increaseMapSize = () => ({
    type: INCREASE_MAP_SIZE
});

export const decreaseMapSize = () => ({
    type: DECREASE_MAP_SIZE
});

export const hotSpotClicked = bool => ({
    type: HOT_SPOT_CLICKED,
    bool: bool
});

export const trailsClicked = bool => ({
    type: TRAILS_CLICKED,
    bool: bool
});

export const activitiesClicked = bool => ({
    type: ACTIVITIES_CLICKED,
    bool: bool
});

export const facilitiesClicked = bool => ({
    type: FACILITIES_CLICKED,
    bool: bool
});
