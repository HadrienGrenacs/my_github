import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Followers from '../Pages/User/Followers';
import Profile from '../Pages/User/Profile';
import Repos from '../Pages/User/Repos';

const Tab = createMaterialTopTabNavigator();

const UserNavigation = props => {
  const login = props.route.params.login;
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        activeTintColor: '#d73a49',
        inactiveTintColor: 'grey',
      }}>
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        initialParams={{login: login}}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="account"
              size={25}
              color={focused ? '#d73a49' : 'grey'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Repos'}
        component={Repos}
        initialParams={{login: login}}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="folder"
              size={25}
              color={focused ? '#d73a49' : 'grey'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Followers'}
        component={Followers}
        initialParams={{login: login}}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="account-multiple"
              size={25}
              color={focused ? '#d73a49' : 'grey'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserNavigation;
