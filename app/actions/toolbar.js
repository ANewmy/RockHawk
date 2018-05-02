/*
* --toolbar action--
* tabClicked is dispatched when a user clicks a tab on the toolbar, name of the tab is saved to the state.
*/

export const TAB_CLICKED = 'TAB_CLICKED';

export const tabClicked = tab => ({
    type: TAB_CLICKED,
    tab: tab,
});
