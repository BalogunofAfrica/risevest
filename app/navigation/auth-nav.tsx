import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import { AdditionalInfo, Landing, SignIn, SignUp } from "@/screens/auth";
import { AccountCreated } from "@/screens/auth/account-created";

export type AuthNavigationRoutes = {
  "/": undefined;
  "/sign-in": undefined;
  "/sign-up": undefined;
  "/additional-info": {
    email: string;
    password: string;
  };
  "/account-created": {
    email: string;
    password: string;
  };
};

const Stack = createStackNavigator<AuthNavigationRoutes>();

export function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        headerShown: false,
      }}
    >
      <Stack.Screen component={Landing} name="/" />
      <Stack.Screen component={SignIn} name="/sign-in" />
      <Stack.Screen component={SignUp} name="/sign-up" />
      <Stack.Screen component={AdditionalInfo} name="/additional-info" />
      <Stack.Screen component={AccountCreated} name="/account-created" />
    </Stack.Navigator>
  );
}
