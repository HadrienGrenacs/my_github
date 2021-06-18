import React from 'react';
import Home from '../Pages/Home/Home';
import {createStackNavigator} from '@react-navigation/stack';
import UserNavigation from './UserNavigation';
import Favorites from '../Pages/Favorites/Favorites';
import RepoNavigation from './RepoNavigation';
import TopBar from './TopBar';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserNavigation"
        component={UserNavigation}
        options={({route}) => ({
          header: () => <TopBar name={route.params.login} />,
        })}
      />
      <Stack.Screen
        name="RepoNavigation"
        component={RepoNavigation}
        options={({route}) => ({
          header: () => <TopBar name={route.params.name} />,
        })}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
