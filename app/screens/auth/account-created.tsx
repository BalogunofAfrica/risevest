import { done } from "@/assets/images";
import { Box, ImageBox, Screen, Text } from "@/components/base";
import { Button } from "@/components/button";
import { px } from "@/constants";
import { useAppRoute } from "@/hooks/navigation";
import { useSignIn } from "@/services/api/auth";

export function AccountCreated() {
  const signIn = useSignIn();
  const route = useAppRoute<"/account-created">();

  const onContinue = () => {
    signIn.mutate({
      email_address: route.params.email,
      password: route.params.password,
    });
  };

  return (
    <Screen justifyContent="space-between" px="sl" py="Ml">
      <Box alignItems="center" gap="xl" pt="xxl">
        <ImageBox aspectRatio={1} height={px(90)} source={done} />
        <Box gap="s" px="xxl">
          <Text fontFamily="TomatoGrotesk_500Medium" variant="h5">
            You just created your Rise account
          </Text>
          <Text color="softText">Welcome to Rise, let’s take you home</Text>
        </Box>
      </Box>
      <Button isLoading={signIn.isLoading} label="Okay" onPress={onContinue} />
    </Screen>
  );
}
