import { useNavigation } from "@react-navigation/native";
import { z } from "zod";

import { Box, Screen, Text } from "@/components/base";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { FormInput } from "@/components/input";
import { px } from "@/constants";
import { useZodForm } from "@/hooks/form";

const upperCaseRegex = /[A-Z]/;
const lengthRegex = /.{8,}/;
const specialCharsRegex = /[!#$%&*?@^]/;
const schema = z.object({
  email: z
    .string({
      required_error: "Please enter an email",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z
    .string({
      required_error: "Please enter a password",
    })
    .refine((data) => upperCaseRegex.test(data))
    .refine((data) => lengthRegex.test(data))
    .refine((data) => specialCharsRegex.test(data)),
});

const PasswordCheckList = ({
  isValid,
  text,
}: {
  isValid: boolean;
  text: string;
}) => (
  <Box alignItems="center" flexDirection="row" gap="s">
    <Box
      alignItems="center"
      aspectRatio={1}
      bg={isValid ? "teal" : undefined}
      borderColor="teal"
      borderRadius="round"
      borderWidth={1}
      justifyContent="center"
      width={px(16)}
    >
      {isValid && <Icon name="check" size="sm" />}
    </Box>
    <Text fontSize={13}>{text}</Text>
  </Box>
);

export function SignUp() {
  const form = useZodForm({
    mode: "onChange",
    schema,
  });
  const currentPassword = form.watch().password ?? "";
  const passWordHasMinimumLength = lengthRegex.test(currentPassword);
  const passWordHasUpperCase = upperCaseRegex.test(currentPassword);
  const passWordHasSpecialChars = specialCharsRegex.test(currentPassword);
  const navigation = useNavigation();

  const onSubmit = form.handleSubmit(({ email, password }) => {
    navigation.navigate("/additional-info", {
      email,
      password,
    });
  });

  return (
    <Screen gap="xxl" px="m" py="Ml">
      <Box gap="sm">
        <Text
          fontFamily="TomatoGrotesk_500Medium"
          textAlign="left"
          variant="h5"
        >
          Create an account
        </Text>
        <Text color="softText" textAlign="left">
          Start building your dollar-denominated investment portfolio
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
          footer=""
          label="Password"
          name="password"
          returnKeyType="done"
          secureTextEntry
        />
        <Box gap="sm">
          <PasswordCheckList
            isValid={passWordHasMinimumLength}
            text="Minimum of 8 characters"
          />
          <PasswordCheckList
            isValid={passWordHasUpperCase}
            text="One UPPERCASE character"
          />
          <PasswordCheckList
            isValid={passWordHasSpecialChars}
            text="One unique character (e.g: !@#$%^&*?)"
          />
        </Box>
        <Button
          disabled={Boolean(
            form.formState.errors.email?.message ||
              form.formState.errors.password?.message,
          )}
          label="Sign Up"
          onPress={() => onSubmit()}
        />
      </Box>
    </Screen>
  );
}
