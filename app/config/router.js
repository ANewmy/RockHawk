import { StackNavigator } from 'react-navigation';

import Loading from '../screens/Loading';
import HomeScreen from '../screens/HomeScreen';
import Help from '../screens/Help';
import Contact from '../screens/Contact';

export default StackNavigator(
    {
        Loading: {
            screen: Loading,
            navigationOptions: {
                header: null,
            },
        },
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: {
                header: null,
            },
        },
        Help: {
            screen: Help,
            navigationOptions: {
                header: null,
            },
        },
        Contact: {
            screen: Contact,
            navigationOptions: {
                header: null,
            },
        },
    },
    {
        initialRouteName: 'Loading',
        headerMode: 'screen',
    },
);
