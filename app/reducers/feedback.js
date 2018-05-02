import { FEEDBACK_SUBMITTED, SAVE_USER_INFO } from '../actions/feedback';

const initialState = {
    feedbackSubmitted: false,
    userInfo: { email: 'Email', phoneNumber: 'Phone Number', name: 'Name' },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FEEDBACK_SUBMITTED:
            return {
                ...state,
                feedbackSubmitted: true,
            };

            break;

        case SAVE_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo,
            };

            break;

        default:
            return state;
    }
};
