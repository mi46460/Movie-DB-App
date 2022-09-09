import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import DetailPage from '../pages/DetailPage';
import WatchListPage from '../pages/WatchListPage';
import { DetailFilmInterface } from '../model/filmDetailAPI';
import DetailPageWatchList from '../pages/DetailPageWatchList';

export type RootStackParamList = {
  DetailPage: { 
    id: number,
  };
  Dashboard: undefined;
  // WatchListPage: {localData: Array<number>};
  WatchListPage: undefined;
  DetailPageWatchList: {
    data: DetailFilmInterface
  }
};

const {Navigator, Screen} = createNativeStackNavigator();

const Routes = () => {
    return (
    <NavigationContainer>
      <Navigator screenOptions={{
            headerShown: false
        }}
        initialRouteName='Dashboard'>
        <Screen name='Dashboard' component={Dashboard} />
        <Screen name='DetailPage' component={DetailPage} />
        <Screen name='WatchListPage' component={WatchListPage} />
        <Screen name='DetailPageWatchList' component={DetailPageWatchList} />
      </Navigator>
    </NavigationContainer>
    );
}

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default Routes;