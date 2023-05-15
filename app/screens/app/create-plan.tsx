import { useNavigation } from "@react-navigation/native";

import { Box, BoxProps, ImageBox, Screen, Text } from "@/components/base";
import { Button } from "@/components/button";
import { Header } from "@/components/common";
import { Icon, IconName } from "@/components/icon";
import { wpx } from "@/constants";
import { useAppRoute } from "@/hooks/navigation";

function InfoBlock({
  body,
  head,
  icon = "question",
}: BoxProps & {
  body: string;
  head: string;
  icon?: IconName;
}) {
  return (
    <Box flexDirection="row" gap="sl">
      <Box
        alignItems="center"
        aspectRatio={1}
        bg="offWhite"
        borderRadius="round"
        justifyContent="center"
        width={40}
      >
        <Icon name={icon} size="m" />
      </Box>
      <Box gap="s" width="80%">
        <Text fontFamily="DMSans_700Bold" textAlign="left">
          {head}
        </Text>
        <Text color="softText" textAlign="left" variant="p">
          {body}
        </Text>
      </Box>
    </Box>
  );
}

export function CreatePlan() {
  const navigation = useNavigation();
  const route = useAppRoute<"/home/create-plan">();

  return (
    <Screen bg="mainBg" px="sl">
      <Header icon="cancel" text="Create a plan" />
      <Box flex={1} justifyContent="space-between" py="l">
        <Box gap="xxl">
          <Text color="softText">Reach your goals faster</Text>
          <Box
            alignItems="center"
            alignSelf="center"
            aspectRatio={1}
            borderRadius="round"
            overflow="hidden"
            width={wpx(100)}
          >
            <ImageBox height="100%" source={route.params.image} />
          </Box>
          <Box gap="l" width="100%">
            <InfoBlock
              body="Tell us what you want to achieve and we will help you get there"
              head="Give us a few details"
              icon="question"
            />
            <InfoBlock
              body="The easiest way to get your investment working for you is to fund to periodically. "
              head="Turn on auto-invest"
              icon="calendar"
            />
            <InfoBlock
              body="You are in charge. Make changes to your plan, from adding funds, funding source, adding money to your wallet and more."
              head="Modify as you progress"
              icon="gear"
            />
          </Box>
        </Box>
        <Button
          label="Continue"
          onPress={() => navigation.navigate("/home/plan-target-set")}
        />
      </Box>
    </Screen>
  );
}
