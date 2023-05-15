import { CommonActions, useNavigation } from "@react-navigation/native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { z } from "zod";

import { Box, Screen, Text } from "@/components/base";
import { Button } from "@/components/button";
import { FormInput } from "@/components/input";
import { useZodForm } from "@/hooks/form";
import { useSignIn } from "@/services/api/auth";

const AnimatedBox = Animated.createAnimatedComponent(Box);
const schema = z.object({
  email: z.string().email(),
  password: z.string({
    required_error: "Please enter a password",
  }),
});

export function SignIn() {
  const signIn = useSignIn();
  const form = useZodForm({
    mode: "onChange",
    schema,
  });
  const navigation = useNavigation();

  const onSubmit = form.handleSubmit(({ email, password }) => {
    signIn.mutate(
      {
        email_address: email,
        password,
      },
      {
        onSuccess: () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "/app" }],
            }),
          );
        },
      },
    );
  });

  return (
    <Screen justifyContent="space-between" px="m" py="Ml">
      <Box gap="xxl">
        <Box gap="sm">
          <Text
            fontFamily="TomatoGrotesk_500Medium"
            textAlign="left"
            variant="h5"
          >
            Welcome back
          </Text>
          <Text color="softText" textAlign="left">
            Let’s get you logged in to get back to building your
            dollar-denominated investment portfolio.
          </Text>
        </Box>
        <Box gap="m">
          <FormInput
            control={form.control}
            keyboardType="email-address"
            label="Email address"
            name="email"
            onSubmitEditing={() => form.setFocus("password")}
            returnKeyType="next"
          />
          <FormInput
            control={form.control}
            label="Password"
            name="password"
            returnKeyType="done"
            secureTextEntry
          />
          <Button
            isLoading={signIn.isLoading}
            label="Sign In"
            onPress={() => onSubmit()}
          />
          <Text color="teal" mt="m" textAlign="center">
            I forgot my password
          </Text>
        </Box>
      </Box>
      <AnimatedBox entering={SlideInDown.delay(500).springify().damping(20)}>
        <Text color="softText" textAlign="center">
          {`Don't have an account? `}
          <Text color="teal" onPress={() => navigation.navigate("/sign-up")}>
            Sign up
          </Text>
        </Text>
      </AnimatedBox>
    </Screen>
  );
}
