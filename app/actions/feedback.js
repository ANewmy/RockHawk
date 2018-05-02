/*
* --feedback action--
* Once the user clicks the submit button, this action is dispatched so that a thank you component can be rendered in the feedback component.
*/

export const FEEDBACK_SUBMITTED = 'FEEDBACK_SUBMITTED';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';

export const feedbackSubmittedClicked = () => ({
    type: FEEDBACK_SUBMITTED,
});

export const saveUserInfo = userInfo => ({
    type: SAVE_USER_INFO,
    userInfo: userInfo,
});
