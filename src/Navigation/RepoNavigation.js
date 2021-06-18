import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Issues from '../Pages/Repo/Issues';
import Informations from '../Pages/Repo/Informations';
import Contributors from '../Pages/Repo/Contributors';
const Tab = createMaterialTopTabNavigator();

const RepoNavigation = props => {
  const {name, login} = props.route.params;
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        activeTintColor: '#0366d6',
        inactiveTintColor: 'grey',
      }}>
      <Tab.Screen
        name={'Informations'}
        component={Informations}
        initialParams={{name: name, login: login}}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="folder-information"
              size={25}
              color={focused ? '#0366d6' : 'grey'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Contributors'}
        component={Contributors}
        initialParams={{name: name, login: login}}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="account-multiple-check"
              size={25}
              color={focused ? '#0366d6' : 'grey'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Issues'}
        component={Issues}
        initialParams={{name: name, login: login}}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="alert-circle"
              size={25}
              color={focused ? '#0366d6' : 'grey'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RepoNavigation;
