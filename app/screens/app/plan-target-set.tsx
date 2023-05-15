import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Keyboard } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { match } from "ts-pattern";
import { z } from "zod";

import { Box, Screen, Text } from "@/components/base";
import { Button } from "@/components/button";
import { Header } from "@/components/common";
import { Icon } from "@/components/icon";
import { DateInput, FormInput } from "@/components/input";
import { toastMethods } from "@/components/toast";
import { px, screenWidth, vw } from "@/constants";
import { useZodForm } from "@/hooks/form";
import { useTheme } from "@/theme";

const AnimatedBox = Animated.createAnimatedComponent(Box);

const slidesProps = {
  px: "sl",
  width: vw(100),
} as const;

const today = new Date();
const year = today.getFullYear() + 1;
const month = today.getMonth();
const day = today.getDate();
const dateYearAhead = new Date(year, month, day);

const steps = 3;
const stepWidth = 100 / steps;

const schema = z.object({
  savingAmount: z.string().regex(/^\d+$/, {
    message: "Target amount should be digits",
  }),
  savingPurpose: z
    .string()
    .min(3, "Your goal name should be more than 3 letters"),
  withdrawDate: z
    .date()
    .min(
      dateYearAhead,
      `Withdraw date must be at least one year from today. Please select a date greater than ${dateYearAhead.toDateString()}`,
    ),
});

export function PlanTargetSet() {
  const form = useZodForm({
    mode: "onChange",
    schema,
  });
  const theme = useTheme();
  const navigation = useNavigation();
  const stepperWidth = useSharedValue(stepWidth);
  const dateValue = form.watch()?.withdrawDate?.toDateString();

  const [currentStep, setCurrentStep] = useState(1);
  const headerText = match(currentStep)
    .with(1, () => "Goal name")
    .with(2, () => "Target amount")
    .with(3, () => "Target date")
    .otherwise(() => "Set goal");

  const stepperTranslateStyle = useAnimatedStyle(() => ({
    width: `${stepperWidth.value}%`,
  }));
  const translateXStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      stepperWidth.value,
      [stepWidth, stepWidth * 2, stepWidth * 3],
      [0, screenWidth, screenWidth * 2],
    );

    return {
      transform: [{ translateX: -translate }],
    };
  });

  const gotToNextField = () => {
    setCurrentStep((value) => value + 1);
    stepperWidth.value = withSpring(stepperWidth.value + stepWidth, {
      damping: 20,
    });
  };
  const onContinue = () => {
    const state = form.watch();
    const errors = form.formState.errors;

    match([currentStep, currentStep <= steps])
      .with([1, true], () => {
        if (state.savingPurpose && !errors.savingPurpose?.message) {
          gotToNextField();
          form.setFocus("savingAmount");
        } else
          toastMethods.show({
            text1: "Please fill in a name for your goal",
            type: "alert",
          });
      })
      .with([2, true], () => {
        if (state.savingAmount && !errors.savingAmount?.message) {
          gotToNextField();
          Keyboard.dismiss();
        } else
          toastMethods.show({
            text1: "Please fill in a target amount",
            type: "alert",
          });
      })
      .with([3, true], () => {
        if (state.withdrawDate && !errors.withdrawDate?.message)
          form.handleSubmit((props) => {
            navigation.navigate("/home/plan-review", {
              ...props,
              withdrawDate: props.withdrawDate.toISOString(),
            });
          })();
        else
          toastMethods.show({
            text1: "Please select a target date",
            type: "alert",
          });
      })
      .otherwise(() => {});
  };

  return (
    <Screen bg="mainBg">
      <Header icon="back-arrow" mx="sl" text={headerText} />
      <Box flex={1} py="l">
        <Box gap="sl" mb="Ml" px="sl">
          <Text color="softText" textAlign="left">
            Question {currentStep} of {steps}
          </Text>
          <Box bg="offWhite" borderRadius="s" height={px(10)} overflow="hidden">
            <AnimatedBox
              bg="teal"
              height="100%"
              style={stepperTranslateStyle}
            />
          </Box>
        </Box>
        <Box flexDirection="row">
          <AnimatedBox {...slidesProps} style={translateXStyle}>
            <FormInput
              control={form.control}
              header="What are you saving for"
              material={false}
              name="savingPurpose"
              returnKeyType="next"
            />
          </AnimatedBox>
          <AnimatedBox {...slidesProps} style={translateXStyle}>
            <FormInput
              control={form.control}
              header="How much do need?"
              keyboardType="number-pad"
              leftComponent={
                <Box justifyContent="center" ml="sl">
                  <Text color="teal">₦</Text>
                </Box>
              }
              material={false}
              name="savingAmount"
            />
          </AnimatedBox>
          <AnimatedBox {...slidesProps} style={translateXStyle}>
            <DateInput
              control={form.control}
              header="When do you want to withdraw?"
              material={false}
              name="withdrawDate"
              placeholderTextColor={theme.colors.black}
              rightComponent={
                <Box justifyContent="center" mr="sl">
                  <Icon name="calendar" size="sl" />
                </Box>
              }
              value={dateValue || "Choose a date"}
            />
          </AnimatedBox>
        </Box>
        <Button label="Continue" mt="l" mx="sl" onPress={onContinue} />
      </Box>
    </Screen>
  );
}
