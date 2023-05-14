import { useFonts } from "@expo-google-fonts/dm-sans";

import { Fonts } from "@/theme/config/fonts";

export function useAppStart() {
  const [fontsLoaded] = useFonts(Fonts);

  return fontsLoaded;
}
