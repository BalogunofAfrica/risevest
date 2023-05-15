import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";
import { StyleSheet } from "react-native";

import { gradientBg } from "@/assets/images";
import {
  Box,
  ImageBox,
  SafeAreaBox,
  ScrollBox,
  ScrollBoxRef,
} from "@/components/base";
import { Button } from "@/components/button";
import { Card, ContactUs, HomeHeader, Plans, Quotes } from "@/components/home";
import { Icon } from "@/components/icon";
import { toastMethods } from "@/components/toast";
import { useMount } from "@/hooks/lifecycle";
import { useGlobalStore } from "@/services/storage";

export function Home() {
  const navigation = useNavigation();
  const store = useGlobalStore();
  const scrollRef = useRef<ScrollBoxRef>(null);

  useMount(() => {
    const pin = store.getter("pin");
    if (!pin) {
      const timerId = setTimeout(() => {
        toastMethods.show({
          onHide: () => {
            navigation.navigate("/create-pin");
          },
          text2: "Set your pin to sign in and confirm transactions",
          type: "alert",
        });
        clearTimeout(timerId);
      }, 3000);
    }
  });
  useScrollToTop(scrollRef);

  return (
    <ScrollBox bg="mainBg" bounces={false} ref={scrollRef}>
      <Box gap="xl" pb="Ml">
        <Box>
          <ImageBox
            source={gradientBg}
            style={StyleSheet.absoluteFillObject}
            width="100%"
          />
          <SafeAreaBox edges={["top"]} pb="s" px="sl">
            <HomeHeader />
            <Card />
            <Button
              icon="plus"
              label="Add money"
              mt="l"
              onPress={() => navigation.navigate("/home/fund-wallet")}
              variant="outline"
            />
          </SafeAreaBox>
        </Box>
        <Plans />
        <ContactUs />
        <Quotes />
        <Icon alignSelf="center" name="rise" size="ML" />
      </Box>
    </ScrollBox>
  );
}
