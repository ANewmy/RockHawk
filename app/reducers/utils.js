import { UPDATE_UTILS } from '../actions/utils';

const initialState = {
    utils: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_UTILS:
            return {
                ...state,
                utils: action.utils
            };

            break;

        default:
            return state;
    }
};
