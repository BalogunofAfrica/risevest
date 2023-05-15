import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import { ConfirmPin, CreatePin, PinCreated } from "@/screens/auth";
import { useGlobalStore } from "@/services/storage";

import { AppNavigation } from "./app-nav";
import { AuthNavigation } from "./auth-nav";
import { navigationRef } from "./utils";

export type RootNavigationRoutes = {
  "/auth": undefined;
  "/app": undefined;
  "/create-pin": undefined;
  "/confirm-pin": {
    pin: string;
  };
  "/pin-created": undefined;
};

const Stack = createStackNavigator<RootNavigationRoutes>();

export function RootNavigation() {
  const store = useGlobalStore();
  const token = store.getter("token");

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
          headerShown: false,
        }}
      >
        {token ? (
          <Stack.Screen component={AppNavigation} name="/app" />
        ) : (
          <Stack.Screen component={AuthNavigation} name="/auth" />
        )}
        <Stack.Screen component={CreatePin} name="/create-pin" />
        <Stack.Screen component={ConfirmPin} name="/confirm-pin" />
        <Stack.Screen component={PinCreated} name="/pin-created" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
