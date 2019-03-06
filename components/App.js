import Login from "./Login";
import Home from "./Home";
import Settings from "./Settings";
import PreferredMeters from "./PreferredMeters";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

const TabNavigator = createBottomTabNavigator({
  Login: { screen: Login },
  Search: { screen: Home },
  Preferred: { screen: PreferredMeters },
  Settings: { screen: Settings }
});

export default createAppContainer(TabNavigator);
