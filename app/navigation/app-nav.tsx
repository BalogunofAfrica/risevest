import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import { Box, Text } from "@/components/base";
import { Icon, IconName } from "@/components/icon";
import { px } from "@/constants";
import {
  CreatePlan,
  FundWallet,
  Home,
  PlanReview,
  PlanTargetSet,
  SelectBank,
  ViewPlan,
} from "@/screens/app";
import { ChoosePlan } from "@/screens/app/choose-plan";
import { PlanCreated } from "@/screens/app/plan-created";

export type TabNavigationRoutes = {
  "/home": undefined;
  "/plans": undefined;
  "/wallet": undefined;
  "/feed": undefined;
  "/account": undefined;
};

export type HomeNavigationRoutes = {
  "/home/": undefined;
  "/home/fund-wallet": undefined;
  "/home/choose-plan": undefined;
  "/home/create-plan": {
    body: string;
    image: number;
    title: string;
  };
  "/home/plan-target-set": undefined;
  "/home/plan-review": {
    savingAmount: string;
    savingPurpose: string;
    withdrawDate: string;
  };
  "/home/plan-created": {
    planId: string;
  };
  "/home/view-plan": {
    planId: string;
  };
  "/home/select-bank": undefined;
};

const HomeNavigation = createStackNavigator<HomeNavigationRoutes>();

function makeTabIcon(active: IconName, inactive: IconName, name: string) {
  return function TabIcon(props: { focused: boolean }) {
    return (
      <Box alignItems="center" gap="xs">
        <Icon name={props.focused ? active : inactive} size="xl" />
        {props.focused ? (
          <Box key={String(props.focused)} p="xs">
            <Box
              aspectRatio={1}
              bg="teal2"
              borderRadius="round"
              height={px(10)}
            />
          </Box>
        ) : (
          <Text color="darkGrayishBlue" variant="p">
            {name}
          </Text>
        )}
      </Box>
    );
  };
}
const Tab = createBottomTabNavigator<TabNavigationRoutes>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: px(90),
        },
      }}
    >
      <Tab.Screen
        component={Home}
        name="/home"
        options={{
          tabBarIcon: makeTabIcon("home-active", "home-inactive", "Home"),
        }}
      />
      <Tab.Screen
        component={PlanTargetSet}
        name="/plans"
        options={{
          tabBarIcon: makeTabIcon("plans-active", "plans-inactive", "Plans"),
        }}
      />
      <Tab.Screen
        component={Home}
        name="/wallet"
        options={{
          tabBarIcon: makeTabIcon("wallet-active", "wallet-inactive", "Wallet"),
        }}
      />
      <Tab.Screen
        component={Home}
        name="/feed"
        options={{
          tabBarIcon: makeTabIcon("feed-active", "feed-inactive", "Feed"),
        }}
      />
      <Tab.Screen
        component={Home}
        name="/account"
        options={{
          tabBarIcon: makeTabIcon(
            "account-active",
            "account-inactive",
            "Account",
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigation() {
  return (
    <HomeNavigation.Navigator
      screenOptions={{
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        headerShown: false,
      }}
    >
      <HomeNavigation.Screen component={Tabs} name="/home/" />
      <HomeNavigation.Screen component={FundWallet} name="/home/fund-wallet" />
      <HomeNavigation.Screen component={CreatePlan} name="/home/create-plan" />
      <HomeNavigation.Screen component={ChoosePlan} name="/home/choose-plan" />
      <HomeNavigation.Screen
        component={PlanTargetSet}
        name="/home/plan-target-set"
      />
      <HomeNavigation.Screen component={PlanReview} name="/home/plan-review" />
      <HomeNavigation.Screen
        component={PlanCreated}
        name="/home/plan-created"
      />
      <HomeNavigation.Screen component={ViewPlan} name="/home/view-plan" />
      <HomeNavigation.Screen component={SelectBank} name="/home/select-bank" />
    </HomeNavigation.Navigator>
  );
}
