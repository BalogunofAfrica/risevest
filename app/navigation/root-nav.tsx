import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import { ScreenOne, ScreenTwo } from "@/screens";

import { navigationRef } from "./utils";

export type RootNavigationRoutes = {
  ScreenOne: undefined;
  ScreenTwo: undefined;
};

const Stack = createStackNavigator<RootNavigationRoutes>();

export function RootNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
          headerShown: false,
        }}
      >
        <Stack.Screen component={ScreenOne} name="ScreenOne" />
        <Stack.Screen component={ScreenTwo} name="ScreenTwo" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
