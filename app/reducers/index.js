import { combineReducers } from 'redux';

import nav from './nav';
import utils from './utils';
import toolbar from './toolbar';

export default combineReducers({
    nav,
    utils,
    toolbar
});
