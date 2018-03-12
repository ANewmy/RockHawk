import { StackNavigator } from 'react-navigation';

import Loading from '../screens/Loading';
import HomeScreen from '../screens/HomeScreen';

export default StackNavigator(
    {
        Loading: {
            screen: Loading,
            navigationOptions: {
                header: null
            }
        },
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'Loading',
        headerMode: 'screen'
    }
);
