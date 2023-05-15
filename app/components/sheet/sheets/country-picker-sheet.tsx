import { useMemo, useState } from "react";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { FlatList } from "react-native-gesture-handler";

import { Box, Text } from "@/components/base";
import { Pressable } from "@/components/button";
import { RegularInput } from "@/components/input";
import { px, vh, vw } from "@/constants/layout";
import { useLazyResult } from "@/hooks/list";
import {
  countryCodes,
  CountryNameLocale,
  CountryNameType,
  CountryType,
} from "@/services/static-data";
import { useTheme } from "@/theme";

type CountryPickerProps = {
  excludedCountries?: CountryNameType[];
  locale?: CountryNameLocale;
  onValueChange?(country: CountryType): void;
};

const SHEET_HEIGHT = px(500);

const Content = ({
  data,
  locale = "en",
  onValueChange,
}: Omit<CountryPickerProps, "excludedCountries"> & {
  data: CountryType[];
}) => {
  const [search, setSearch] = useState("");
  const searchedResults = useMemo(() => {
    if (search) {
      return data.filter((country) =>
        country.name[locale].toLowerCase().includes(search.toLocaleLowerCase()),
      );
    }
    return data;
  }, [data, locale, search]);
  const lazyResult = useLazyResult(searchedResults, () => {});

  return (
    <Box
      borderTopLeftRadius="l"
      borderTopRightRadius="l"
      height={vh(80)}
      paddingBottom="sl"
      paddingTop="xl"
      width={vw(100)}
    >
      <RegularInput
        containerProps={{
          marginHorizontal: "sl",
        }}
        onChangeText={setSearch}
        placeholder="Search Country"
      />
      <FlatList
        data={lazyResult.lazyResult}
        keyExtractor={(item) => item.code}
        ListEmptyComponent={
          <Text marginHorizontal="sl" textAlign="left" variant="p">
            No country found
          </Text>
        }
        nestedScrollEnabled
        onEndReached={lazyResult.fetchNextPage}
        renderItem={({ item }) => (
          <Pressable
            alignItems="center"
            flexDirection="row"
            marginVertical="sm"
            onPress={() => {
              onValueChange?.(item);
            }}
            paddingHorizontal="sl"
          >
            <Text
              color="teal"
              fontSize={14}
              style={{ flex: 0.2 }}
              textAlign="justify"
              variant="p"
            >
              {item.dial_code}
            </Text>
            <Text
              color="teal"
              fontSize={14}
              style={{ flex: 0.2 }}
              textAlign="justify"
              variant="p"
            >
              {item.flag}
            </Text>
            <Text
              color="teal"
              fontSize={14}
              style={{ flex: 1 }}
              textAlign="justify"
              variant="p"
            >
              {item.name[locale]}
            </Text>
          </Pressable>
        )}
      />
    </Box>
  );
};

export function CountryPickerSheet(props: SheetProps<CountryPickerProps>) {
  const excludedCountries = props.payload?.excludedCountries;
  const locale = props.payload?.locale;
  const onValueChange = props.payload?.onValueChange;

  const nonExcludedCountries = countryCodes.filter(
    (country) => !excludedCountries?.includes(country.name.en),
  );
  const theme = useTheme();

  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: theme.colors.mainBg,
        borderTopLeftRadius: theme.borderRadii.sm,
        borderTopRightRadius: theme.borderRadii.sm,
        overflow: "hidden",
        padding: 0,
      }}
      defaultOverlayOpacity={0.4}
      id={props.sheetId}
      indicatorStyle={{
        height: 0,
      }}
    >
      <Box
        borderTopLeftRadius="sm"
        borderTopRightRadius="sm"
        height={SHEET_HEIGHT}
      >
        <Content
          data={nonExcludedCountries}
          locale={locale}
          onValueChange={onValueChange}
        />
      </Box>
    </ActionSheet>
  );
}
