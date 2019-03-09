import React from "react";
import Login from "./Login";
import Home from "./Home";
import Settings from "./Settings";
import PreferredMeters from "./PreferredMeters";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

const TabNavigator = createBottomTabNavigator(
  {
    Login: { screen: Login },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: () => <Icon name="search" size={24} />
      }
    },
    Preferred: {
      screen: PreferredMeters,
      navigationOptions: {
        tabBarLabel: "Preferred Meters",
        tabBarIcon: () => <Icon name="star" size={24} />
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: () => <Icon name="settings" size={24} />
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true
    }
  }
);

export default createAppContainer(TabNavigator);
