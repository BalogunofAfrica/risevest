import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import Animated, {
  createAnimatedPropAdapter,
  FadeIn,
  FadeOut,
  interpolateColor,
  processColor,
  runOnJS,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

import { dollar, gift, time } from "@/assets/images";
import {
  Box,
  ImageBox,
  ScrollBox,
  ScrollBoxRef,
  Text,
} from "@/components/base";
import { Button, Pressable } from "@/components/button";
import { Dot } from "@/components/landing";
import { px, screenWidth, vw, wpx } from "@/constants";
import { useTheme } from "@/theme";
import { colors as c } from "@/theme/config/colors";

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedScrollBox = Animated.createAnimatedComponent(ScrollBox);

const adapter = createAnimatedPropAdapter(
  (props) => {
    if (Object.keys(props).includes("stroke")) {
      // eslint-disable-next-line no-param-reassign
      props.stroke = {
        payload: processColor(props.stroke as string),
        type: 0,
      };
    }
  },
  ["stroke"],
);

const assets = [
  {
    bg: c.grayishOrange,
    body: "Rise invests your money into the best dollar investments around the world.",
    head: "Quality assets",
    image: gift,
  },
  {
    bg: c.grayishPink,
    body: "Our expert team and intelligent algorithms select assets that beat the markets.",
    head: "Superior Selection",
    image: dollar,
  },
  {
    bg: c.paleCyan,
    body: "You earn more returns, achieve more of your financial goals and protect your money from devaluation.",
    head: "Better Performance",
    image: time,
  },
] as const;

const Chevron = ({
  animatedProps,
  ...rest
}: React.ComponentProps<typeof AnimatedPath>) => (
  <Svg fill="none" height={12} width={13}>
    <AnimatedPath
      {...rest}
      animatedProps={animatedProps}
      d="M5.867 1 11 6m0 0-5.133 5M11 6H0"
      strokeWidth={2}
    />
  </Svg>
);

export function Landing() {
  const theme = useTheme();
  const navigation = useNavigation();
  const translateX = useSharedValue(0);
  const ref = React.useRef<ScrollBoxRef>(null);
  const [isLastSlide, setIsLastSlide] = React.useState(false);

  const bgStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, screenWidth, screenWidth * 2],
      [
        theme.colors.grayishOrange,
        theme.colors.grayishPink,
        theme.colors.paleCyan,
      ],
    );

    return {
      backgroundColor,
    };
  });
  const promoTextStyle = useAnimatedStyle(() => {
    const translate = withSpring(-translateX.value, {
      damping: 20,
    });
    return {
      transform: [{ translateX: translate }],
    };
  });
  const strokeStyle = useAnimatedProps(
    () => {
      const stroke = interpolateColor(
        translateX.value,
        [0, screenWidth, screenWidth * 2],
        [theme.colors.orange, theme.colors.indigo, theme.colors.teal],
      );

      return {
        stroke,
      };
    },
    [],
    adapter,
  );
  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      translateX.value,
      [0, screenWidth, screenWidth * 2],
      [theme.colors.orange, theme.colors.indigo, theme.colors.teal],
    );

    return {
      color,
    };
  });

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeSyntheticEvent<NativeScrollEvent>["nativeEvent"]) => {
    "worklet";

    runOnJS(setIsLastSlide)(
      Math.round(layoutMeasurement.width + contentOffset.x) >=
        Math.round(contentSize.width),
    );
  };
  const scrollHandler = useAnimatedScrollHandler((event) => {
    isCloseToBottom(event);
    translateX.value = event.contentOffset.x;
  });
  const handlePreviousPress = () => {
    if (translateX.value > 0) {
      ref?.current?.scrollTo({
        animated: true,
        x: translateX.value - screenWidth,
      });
      translateX.value = withSpring(translateX.value - screenWidth);
    }
  };
  const handleNextPress = () => {
    if (Math.round(translateX.value) < Math.round(screenWidth) * 2) {
      ref?.current?.scrollTo({
        animated: true,
        x: translateX.value + screenWidth,
      });
      translateX.value = withSpring(translateX.value + screenWidth);
    }
  };

  return (
    <AnimatedBox flex={1} gap="xxl" justifyContent="center" style={bgStyle}>
      <Box height={px(300)}>
        <AnimatedScrollBox
          horizontal
          onScroll={scrollHandler}
          pagingEnabled
          ref={ref}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {assets.map((asset) => (
            <Box justifyContent="center" key={asset.image} width={vw(100)}>
              <ImageBox
                alignSelf="center"
                aspectRatio={1}
                source={asset.image}
                width={wpx(300)}
              />
            </Box>
          ))}
        </AnimatedScrollBox>
      </Box>
      <Box flexDirection="row" gap="sm" height={px(10)} justifyContent="center">
        {assets.map(({ body }, index) => (
          <Dot index={index} key={body} translateX={translateX} />
        ))}
      </Box>
      <Box flexDirection="row">
        {assets.map(({ head, body }) => (
          <AnimatedBox
            gap="sm"
            key={body}
            px="sl"
            style={promoTextStyle}
            width={vw(100)}
          >
            <AnimatedText style={textStyle}>{head}</AnimatedText>
            <Text>{body}</Text>
          </AnimatedBox>
        ))}
      </Box>
      {isLastSlide ? (
        <AnimatedBox
          entering={FadeIn}
          exiting={FadeOut}
          gap="sm"
          height={px(150)}
          key={String(isLastSlide)}
          px="sl"
        >
          <Button
            label="Sign Up"
            onPress={() => navigation.navigate("/sign-up")}
          />
          <Button
            label="Sign In"
            onPress={() => navigation.navigate("/sign-in")}
            variant="secondary"
          />
        </AnimatedBox>
      ) : (
        <AnimatedBox
          entering={FadeIn}
          exiting={FadeOut}
          flexDirection="row"
          height={px(150)}
          justifyContent="space-between"
          key={String(isLastSlide)}
          px="sl"
        >
          <Pressable
            bg="offWhite"
            borderRadius="xs"
            onPress={handlePreviousPress}
            p="m"
            style={{ transform: [{ rotate: "180deg" }] }}
          >
            <Chevron animatedProps={strokeStyle} />
          </Pressable>
          <Pressable
            alignItems="center"
            bg="offWhite"
            borderRadius="xs"
            flexDirection="row"
            gap="l"
            justifyContent="space-between"
            onPress={handleNextPress}
            p="m"
          >
            <AnimatedText style={textStyle}>Next</AnimatedText>
            <Chevron animatedProps={strokeStyle} />
          </Pressable>
        </AnimatedBox>
      )}
    </AnimatedBox>
  );
}
