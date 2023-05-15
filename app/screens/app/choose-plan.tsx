import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet } from "react-native";

import { businessPlan, wealthPlan, weddingPlan } from "@/assets/images";
import { Box, ImageBox, Screen, Text } from "@/components/base";
import { Pressable } from "@/components/button";
import { Header } from "@/components/common";
import { Icon } from "@/components/icon";
import { wpx } from "@/constants";
import { useTheme } from "@/theme";

const plans = [
  {
    body: "$1,983.09",
    image: weddingPlan,
    title: "Plan a wedding",
  },
  {
    body: "$1,983.09",
    image: businessPlan,
    title: "Start a Business",
  },
  {
    body: "Mixed assets",
    image: wealthPlan,
    title: "Build Wealth",
  },
];

export function ChoosePlan() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <Screen bg="mainBg" px="sl">
      <Header icon="cancel" text="Choose from plans" />
      <Box flex={1} justifyContent="space-between" py="sm">
        <Text color="softText" mb="l">
          Tap on any of the plans to select
        </Text>
        <FlatList
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          data={plans}
          numColumns={2}
          renderItem={({ item }) => (
            <Pressable
              borderRadius="s"
              key={item.title}
              onPress={() => navigation.navigate("/home/create-plan", item)}
              type="opacity"
            >
              <ImageBox borderRadius="s" source={item.image} width={wpx(160)} />
              <Box bottom={0} style={StyleSheet.absoluteFillObject}>
                <Box
                  alignItems="center"
                  bottom={theme.spacing.xl}
                  flexDirection="row"
                  justifyContent="space-between"
                  position="absolute"
                  px="sm"
                  width="100%"
                >
                  <Box>
                    <Text color="white" textAlign="left" variant="p">
                      {item.title}
                    </Text>
                    <Text
                      color="white"
                      fontFamily="TomatoGrotesk_400Regular"
                      textAlign="left"
                    >
                      {item.body}
                    </Text>
                  </Box>
                  <Icon name="forward-arrow" size="m" />
                </Box>
              </Box>
            </Pressable>
          )}
        />
      </Box>
    </Screen>
  );
}
