import { TAB_CLICKED } from '../actions/toolbar';

const initialState = {
    tab: 'Home'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TAB_CLICKED:
            return {
                ...state,
                tab: action.tab
            };

            break;

        default:
            return state;
    }
};
