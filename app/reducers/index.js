import { combineReducers } from 'redux';

import nav from './nav';
import location from './location';
import toolbar from './toolbar';

export default combineReducers({
    nav,
    location,
    toolbar
});
