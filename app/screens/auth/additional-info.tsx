import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Linking } from "react-native";
import { z } from "zod";

import { Box, KeyboardAwareScrollBox, Screen, Text } from "@/components/base";
import { Button, Pressable } from "@/components/button";
import { Icon } from "@/components/icon";
import { DateInput, FormInput } from "@/components/input";
import { sheetMethods } from "@/components/sheet";
import { useZodForm } from "@/hooks/form";
import { useAppRoute } from "@/hooks/navigation";
import { useSignUp } from "@/services/api/auth";
import { countryCodes } from "@/services/static-data";

const today = new Date();
const year = today.getFullYear() - 18;
const month = today.getMonth();
const day = today.getDate();
const date18YearsAgo = new Date(year, month, day);

const defaultCode = countryCodes.find((item) => item.code === "NG");

const schema = z.object({
  dateOfBirth: z
    .date({ required_error: "Please select your date of birth" })
    .max(
      date18YearsAgo,
      `You must be at least 18 years old, please select a date older than ${date18YearsAgo.toDateString()}`,
    ),
  firstName: z.string({ required_error: "Please fill in your first name" }),
  lastName: z.string({ required_error: "Please fill in your last name" }),
  nickName: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, {
      message: "Phone number must contain only digits",
    })
    .min(10, "Phone number must be at least 10 digits")
    .optional(),
});

export function AdditionalInfo() {
  const signup = useSignUp();
  const form = useZodForm({
    mode: "onChange",
    schema,
  });
  const dateValue = form.watch()?.dateOfBirth?.toDateString();

  const navigation = useNavigation();
  const route = useAppRoute<"/additional-info">();

  const [countryCode, setCountryCode] = useState(defaultCode);

  const onSubmit = form.handleSubmit((props) => {
    signup.mutate(
      {
        date_of_birth: props.dateOfBirth,
        email_address: route.params.email,
        first_name: props.firstName,
        last_name: props.lastName,
        password: route.params.password,
        phone_number: props.phoneNumber,
        username: props.nickName,
      },
      {
        onSuccess: () => {
          navigation.navigate("/account-created", route.params);
        },
      },
    );
  });
  const handleCountryPick = () => {
    sheetMethods.show("country-picker", {
      payload: {
        onValueChange: (value) => {
          sheetMethods.hide("country-picker");
          setCountryCode(value);
        },
      },
    });
  };

  return (
    <Screen>
      <KeyboardAwareScrollBox>
        <Box gap="xl" px="m" py="Ml">
          <Box gap="sm">
            <Text
              fontFamily="TomatoGrotesk_500Medium"
              textAlign="left"
              variant="h5"
            >
              Tell Us More About You
            </Text>
            <Text color="softText" textAlign="left">
              Please use your name as it appears on your ID.
            </Text>
          </Box>
          <Box gap="m">
            <FormInput
              control={form.control}
              label="Legal First Name"
              name="firstName"
              onSubmitEditing={() => form.setFocus("lastName")}
              returnKeyType="next"
            />
            <FormInput
              control={form.control}
              label="Legal Last Name"
              name="lastName"
              onSubmitEditing={() => form.setFocus("nickName")}
              returnKeyType="next"
            />
            <FormInput
              control={form.control}
              label="Nick name"
              name="nickName"
              onSubmitEditing={() => form.setFocus("phoneNumber")}
              returnKeyType="next"
            />
            <FormInput
              control={form.control}
              keyboardType="number-pad"
              label="Phone Number"
              leftComponent={
                <Pressable
                  alignItems="center"
                  flexDirection="row"
                  gap="s"
                  ml="sl"
                  onPress={handleCountryPick}
                  zIndex={10}
                >
                  <Text fontFamily="TomatoGrotesk_700Bold">
                    {`${countryCode?.flag}  ${countryCode?.dial_code}`}
                  </Text>
                  <Icon
                    name="chevron-right"
                    size="sm"
                    style={{ transform: [{ rotate: "90deg" }] }}
                  />
                  <Box bg="lightGrayishBlue" height={35} width={1} />
                </Pressable>
              }
              name="phoneNumber"
              onSubmitEditing={() => form.setFocus("dateOfBirth")}
              px="nill"
              returnKeyType="done"
            />
            <DateInput
              control={form.control}
              label="Date of Birth"
              name="dateOfBirth"
              value={dateValue || "Choose date"}
            />
            <Button
              isLoading={signup.isLoading}
              label="Continue"
              onPress={() => onSubmit()}
            />
          </Box>
          <Box>
            <Text mx="xxl" textAlign="center" variant="p">
              By clicking Continue, you agree to our{" "}
              <Text
                color="teal"
                onPress={() =>
                  Linking.openURL("https://risevest.com/terms-of-use")
                }
                variant="p"
              >
                Terms of Service
              </Text>
              {" and "}
              <Text
                color="teal"
                onPress={() =>
                  Linking.openURL("https://rise.capital/privacy-policy")
                }
                variant="p"
              >
                Privacy Policy.
              </Text>
            </Text>
          </Box>
        </Box>
      </KeyboardAwareScrollBox>
    </Screen>
  );
}
