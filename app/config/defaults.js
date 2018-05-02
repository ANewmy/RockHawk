const portInUse = '8080';

export const defaults = {
    LOCATION_TYPE_FACILITY: 0,
    LOCATION_TYPE_ACTIVITY: 1,
    LOCATION_TYPE_HOTSPOT: 2,

    locationListApi: 'http://104.237.132.189:' + portInUse + '/locationData_list/',
    feedbackAPI: 'http://104.237.132.189:' + portInUse + '/feedback_list/',
    locationData: 'http://104.237.132.189:' + portInUse + '/RockHawk/locationData/', //this requires /id/
    trailListAPI: 'http://104.237.132.189:' + portInUse + '/trailData_list/',
    imageAPI: 'http://104.237.132.189:' + portInUse,

    ds: [
        {
            title: 'Eatonton-Putnam Chamber of Commerce',
            website: 'http://www.visiteatonton.com',
            phone: '706-485-7701',
            address: '305 North Madison Avenue Eatonton, GA 31024 Mailing Address PO Box 4088' + 'Eatonton, GA 31024',
            email: 'info@eatonton.com',
        },
        {
            title: 'Georgia Power',
            website: 'http://www.georgiapower.com/lakes/home.asp',
            phone: '888-472-5253',
            address: null,
            email: null,
        },
        {
            title: 'Georgia Dept. of Natural Resources, Wildlife Division',
            website: 'http://www.georgiawildlife.com/',
            phone: null,
            address: null,
            email: null,
        },
        {
            title: 'Historic Piedmont Scenic Byway',
            website: 'http://scenicbyway.org/',
            phone: '706-485-7701',
            address: null,
            email: null,
        },
    ],
    DEFAULT_TRAIL_DATA: [
        {
            id: 1,
            name: 'Commute',
            trail_info: 'Commute from my house to the office.',
            trail_length_in_miles: 3,
            trail_latitudes: [33.082201, 33.084066, 33.083746, 33.085124, 33.084914],
            trail_longitudes: [-83.227368, -83.227892, -83.22959, -83.229943, -83.230963],
            trail_type: 0,
        },
    ],
    DEFAULT_LOCATION_DATA: [
        {
            coordinate: { latitude: 33.080825, longitude: -83.228375 },
            title: 'The Brick',
            description: 'Food Here',
            locationType: 2,
            radius: 40,
        },
        {
            coordinate: { latitude: 33.081544, longitude: -83.227954 },
            title: 'Amicci Milledgeville',
            description: 'Food Here',
            locationType: 2,
            radius: 40,
        },
        {
            coordinate: {
                latitude: 33.084691367449224,
                longitude: -83.23095118626952,
            },
            title: 'Atkinson Hall',
            description:
                'Atkinson Hall, founded in 1899 by Sir. George D YunderHosen as one of the few only womens college in Georgia.',
            locationType: 2,
            radius: 40,
        },
        {
            coordinate: { latitude: 33.081631, longitude: -83.226325 },
            title: 'United States Postal Service',
            description: 'Mail letters here',
            locationType: 2,
            radius: 40,
        },
        {
            coordinate: { latitude: 33.080676, longitude: -83.227185 },
            title: 'Capital City',
            description: 'Propbably need bobcat ID',
            locationType: 2,
            radius: 40,
        },
        {
            coordinate: { latitude: 33.08109, longitude: -83.230539 },
            title: 'Front Campus',
            description: 'Dogs allowed',
            locationType: 1,
        },
        {
            coordinate: { latitude: 33.082665, longitude: -83.232281 },
            title: 'Georgia College Meseum',
            description: 'Cool stuff here',
            locationType: 1,
        },
        {
            coordinate: { latitude: 33.076403, longitude: -83.233826 },
            title: 'Centennial Center',
            description: 'Basketball happens sometimes',
            locationType: 1,
        },
        {
            coordinate: { latitude: 33.07768, longitude: -83.23374 },
            title: 'Tennis Courts',
            description: 'Marshall plays here sometimes',
            locationType: 1,
        },
        {
            coordinate: { latitude: 33.081692, longitude: -83.218829 },
            title: 'Greenway',
            description: 'My dog likes it here',
            locationType: 1,
        },
        {
            coordinate: { latitude: 33.08368, longitude: -83.223765 },
            title: 'Station On McIntosh',
            description: 'People Live here?',
            locationType: 0,
        },
        {
            coordinate: { latitude: 33.086048, longitude: -83.229167 },
            title: 'College Station',
            description: 'People Live here!',
            locationType: 0,
        },
        {
            coordinate: { latitude: 33.078249, longitude: -83.232703 },
            title: 'Dorms',
            description: 'Freshman sleep here sometimes',
            locationType: 0,
        },
        {
            coordinate: { latitude: 33.084704, longitude: -83.230818 },
            title: 'Andrews House',
            description: 'Lady also lives here',
            locationType: 0,
        },
    ],
};

export default defaults;
