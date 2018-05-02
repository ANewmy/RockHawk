import { combineReducers } from 'redux';

import nav from './nav';
import location from './location';
import toolbar from './toolbar';
import feedback from './feedback';

export default combineReducers({
    nav,
    location,
    toolbar,
    feedback,
});
