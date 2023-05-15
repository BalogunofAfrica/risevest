// import Picker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";
import Picker, {
  DatePickerProps as PickerProps,
} from "react-native-date-picker";

import { useTheme } from "@/theme";

import { Box } from "../base";
import { Pressable } from "../button";
import { Icon } from "../icon";
import { MaterialInput, MaterialInputProps } from "./material-input";
import { RegularInput, RegularInputProps } from "./regular-input";

type TRule = Omit<
  RegisterOptions,
  "valueAsNumber" | "valueAsDate" | "setValueAs"
>;

type DateInputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

type RegularProps<T extends FieldValues> = RegularInputProps &
  DateInputControllerType<T> & {
    material?: false;
    pickerProps?: Omit<PickerProps, "date">;
  };
type MaterialProps<T extends FieldValues> = MaterialInputProps &
  DateInputControllerType<T> & {
    material?: true;
    pickerProps?: Omit<PickerProps, "date">;
  };

export type DateInputProps<T extends FieldValues> =
  | RegularProps<T>
  | MaterialProps<T>;

export function DateInput<T extends FieldValues>({
  control,
  material = true,
  name,
  pickerProps,
  rules,
  ...props
}: DateInputProps<T>) {
  const Input = material ? MaterialInput : RegularInput;
  const controller = useController({
    control,
    name,
    rules,
  });
  const theme = useTheme();
  const [dateOpen, setDateOpen] = useState(false);

  return (
    <>
      <Pressable onPress={() => setDateOpen(true)}>
        <Input
          editable={false}
          footer={controller.fieldState?.error?.message}
          placeholderTextColor={theme.colors.black}
          pointerEvents="none"
          // @ts-expect-error TODO: fix type error
          ref={controller.field.ref}
          rightComponent={
            <Box justifyContent="center" mr="xxl">
              <Icon name="calendar" size="sl" />
            </Box>
          }
          width="85%"
          {...props}
        />
      </Pressable>
      <Picker
        androidVariant="iosClone"
        date={new Date()}
        locale="en"
        modal
        mode="date"
        onCancel={() => {
          setDateOpen(false);
        }}
        onConfirm={(date_) => {
          controller.field.onChange(date_);
          setDateOpen(false);
        }}
        open={dateOpen}
        textColor="#000"
        theme="light"
        {...pickerProps}
      />
    </>
  );
}
