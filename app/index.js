import React, { Component } from 'react';
import Navigator from './config/router';
import { addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { View, Text } from 'react-native';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';

import store from './config/store';

const App = ({ dispatch, nav }) => (
    <Navigator
        navigation={addNavigationHelpers({
            dispatch,
            state: nav,
        })}
    />
);

const mapStateToProps = state => ({
    nav: state.nav,
});

const AppWithNavigation = connect(mapStateToProps)(App);

export default class AppProvider extends Component {
    constructor() {
        super();
        this.state = { rehydrated: false };
    }

    componentWillMount() {
        let p = persistStore(store, { storage: AsyncStorage, blacklist: ['nav'] }, () => {
            this.setState({ rehydrated: true });
        });
        //p.purge();
    }

    render() {
        if (!this.state.rehydrated) {
            return <View />;
        }

        return (
            <Provider store={store}>
                <AppWithNavigation />
            </Provider>
        );
    }
}
