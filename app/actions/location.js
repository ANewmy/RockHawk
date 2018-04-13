export const INIT_POSITION = 'INIT_POSITION';
export const INCREASE_MAP_SIZE = 'INCREASE_MAP_SIZE';
export const DECREASE_MAP_SIZE = 'DECREASE_MAP_SIZE';
export const TRAILS_CLICKED = 'TRAILS_CLICKED';
export const HOT_SPOT_CLICKED = 'HOT_SPOT_CLICKED';
export const ACTIVITIES_CLICKED = 'ACTIVITIES_CLICKED';
export const FACILITIES_CLICKED = 'FACILITIES_CLICKED';
export const SAVE_LOCATION_DATA = 'SAVE_LOCATION_DATA';
export const UPDATE_LOCATION_LIST = 'UPDATE_LOCATION_LIST';
export const HOT_SPOT_ENTERED = 'HOT_SPOT_ENTERED';

import { defaults } from '../config/defaults';

export const initPosition = coords => ({
    type: INIT_POSITION,
    coords: coords
});

export const saveLocationData = locationData => ({
    type: SAVE_LOCATION_DATA,
    locationData: locationData
});

export const updateLocationList = location => ({
    type: UPDATE_LOCATION_LIST,
    location: location
});

export const hotSpotEntered = location => ({
    type: HOT_SPOT_ENTERED,
    location: location
});

export function updateVisitorCount(location) {
    return dispatch => {
        return new Promise(function(resolve, reject) {
            console.log('location: ', location);
            var url = defaults.locationData + location.id + '/';
            console.log('url: ', url);
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(responseJson => {
                    console.log('actions.updateVisitorCount.GET: ', responseJson);
                    dispatch(updateLocationList(location));
                    var updatedCount = responseJson;
                    updatedCount.visitorCount++;

                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        body: JSON.stringify(updatedCount)
                    })
                        .then(response => {
                            return response.json();
                        })
                        .then(responseJson => {
                            console.log('actions.updateVisitorCount.PUT: ', responseJson);
                            resolve();
                        })
                        .catch(error => {
                            console.log('actions.getLocationData: Error', error);
                            resolve();
                        });
                })
                .catch(error => {
                    console.log('actions.updateVisitorCount.GET: Error', error);
                    resolve();
                });
        });
    };
}

export function getLocationData() {
    return dispatch => {
        return new Promise(function(resolve, reject) {
            fetch(defaults.locationListApi)
                .then(response => {
                    return response.json();
                })
                .then(responseJson => {
                    console.log('actions.getLocationData: ', responseJson);
                    resolve();
                    dispatch(saveLocationData(responseJson));
                })
                .catch(error => {
                    console.log('actions.getLocationData: Error', error);
                    resolve();
                    dispatch(saveLocationData(defaults.DEFAULT_LOCATION_DATA));
                });
        });
    };
}

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
