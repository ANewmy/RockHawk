/*
* --location action--
* const variables that start with "save" (ex. saveLocationData) will save the data passed into the action to the state
* const variables that start in "update" (ex. updateLocationList) will update previously saved state data with the data passed into the action
* const variables that end in "clicked" (ex. trailsClicked) will set the corresponding flag in the state to true/false so we can render the appropriate details in components/Map.js
* exported functions will perform async operations like contacting the server, and dispatch actions when the operation completes
*/

export const INIT_POSITION = 'INIT_POSITION';
export const INCREASE_MAP_SIZE = 'INCREASE_MAP_SIZE';
export const DECREASE_MAP_SIZE = 'DECREASE_MAP_SIZE';
export const TRAILS_CLICKED = 'TRAILS_CLICKED';
export const HOT_SPOT_CLICKED = 'HOT_SPOT_CLICKED';
export const ACTIVITIES_CLICKED = 'ACTIVITIES_CLICKED';
export const FACILITIES_CLICKED = 'FACILITIES_CLICKED';
export const SAVE_LOCATION_DATA = 'SAVE_LOCATION_DATA';
export const SAVE_TRAIL_DATA = 'SAVE_TRAIL_DATA';
export const UPDATE_LOCATION_LIST = 'UPDATE_LOCATION_LIST';
export const HOT_SPOT_ENTERED = 'HOT_SPOT_ENTERED';
export const INFO_CLICKED = 'INFO_CLICKED';
export const CLOSE_INFO = 'CLOSE_INFO';

import { defaults } from '../config/defaults';

//Initiates position
export const initPosition = coords => ({
    type: INIT_POSITION,
    coords: coords,
});

export const saveLocationData = locationData => ({
    type: SAVE_LOCATION_DATA,
    locationData: locationData,
});

export const saveTrailData = trailData => ({
    type: SAVE_TRAIL_DATA,
    trailData: trailData,
});

export const infoClicked = infoObj => ({
    type: INFO_CLICKED,
    infoObj: infoObj,
});

export const closeInfo = () => ({
    type: CLOSE_INFO,
});

export const updateLocationList = location => ({
    type: UPDATE_LOCATION_LIST,
    location: location,
});

export const hotSpotEntered = location => ({
    type: HOT_SPOT_ENTERED,
    location: location,
});

export function updateVisitorCount(location) {
    return dispatch => {
        return new Promise(function(resolve, reject) {
            //Assemble the url for updating visitor count.
            var url = defaults.locationData + location.id + '/';
            console.log('actions.location.updateVisitorCount url: ', url);

            //Fetch the location data from the server
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(responseJson => {
                    console.log('actions.updateVisitorCount.GET: ', responseJson);
                    dispatch(updateLocationList(location));

                    //increment the visitor count of the location parameter and send the updated info to the server
                    var updatedCount = responseJson;
                    updatedCount.visitor_count++;

                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json; charset=utf-8',
                        },
                        body: JSON.stringify(updatedCount),
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
            //Get the location data from the server, and save the location data to the state.
            fetch(defaults.locationListApi)
                .then(response => {
                    return response.json();
                })
                .then(responseJson => {
                    console.log('actions.getLocationData: location list ', responseJson);
                    dispatch(saveLocationData(responseJson));

                    fetch(defaults.trailListAPI)
                        .then(response => {
                            return response.json();
                        })
                        .then(responseJson => {
                            console.log('actions.getLocationData: trail list ', responseJson);

                            dispatch(saveTrailData(responseJson));
                            resolve();
                        })
                        .catch(error => {
                            console.log('actions.getLocationData:trail list Error', error);
                            dispatch(saveTrailData(defaults.DEFAULT_TRAIL_DATA));
                            resolve();
                        });
                })
                .catch(error => {
                    console.log('actions.getLocationData: location list Error', error);
                    resolve();
                    dispatch(saveLocationData(defaults.DEFAULT_LOCATION_DATA));
                });
        });
    };
}

export const increaseMapSize = () => ({
    type: INCREASE_MAP_SIZE,
});

export const decreaseMapSize = () => ({
    type: DECREASE_MAP_SIZE,
});

export const hotSpotClicked = bool => ({
    type: HOT_SPOT_CLICKED,
    bool: bool,
});

export const trailsClicked = bool => ({
    type: TRAILS_CLICKED,
    bool: bool,
});

export const activitiesClicked = bool => ({
    type: ACTIVITIES_CLICKED,
    bool: bool,
});

export const facilitiesClicked = bool => ({
    type: FACILITIES_CLICKED,
    bool: bool,
});
