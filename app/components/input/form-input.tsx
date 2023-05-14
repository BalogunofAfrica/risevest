import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";

import { MaterialInput, MaterialInputProps } from "./material-input";
import { RegularInput, RegularInputProps } from "./regular-input";

type TRule = Omit<
  RegisterOptions,
  "valueAsNumber" | "valueAsDate" | "setValueAs"
>;

type FormInputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

type RegularProps<T extends FieldValues> = RegularInputProps &
  FormInputControllerType<T> & {
    material?: false;
  };
type MaterialProps<T extends FieldValues> = MaterialInputProps &
  FormInputControllerType<T> & {
    material?: true;
  };

export type FormInputProps<T extends FieldValues> =
  | RegularProps<T>
  | MaterialProps<T>;

/**
 * Custom `TextInput` component that supports `react-hook-form`.
 */
export function FormInput<T extends FieldValues>({
  control,
  material = true,
  name,
  rules,
  ...rest
}: FormInputProps<T>) {
  const Input = material ? MaterialInput : RegularInput;
  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });

  return (
    <Input
      footer={fieldState?.error?.message}
      onChangeText={field.onChange}
      onRightIconPress={() => field.onChange("")}
      // @ts-expect-error TODO: fix type error
      ref={field.ref}
      value={field.value as string}
      {...rest}
    />
  );
}
