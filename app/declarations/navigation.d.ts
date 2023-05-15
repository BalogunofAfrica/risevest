/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-empty-interface */

import {
  HomeNavigationRoutes,
  TabNavigationRoutes,
} from "@/navigation/app-nav";
import { AuthNavigationRoutes } from "@/navigation/auth-nav";
import { RootNavigationRoutes } from "@/navigation/root-nav";

export type StackParamsList = RootNavigationRoutes &
  AuthNavigationRoutes &
  HomeNavigationRoutes &
  TabNavigationRoutes;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamsList {}
  }
}
