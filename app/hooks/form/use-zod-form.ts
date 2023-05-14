import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

interface UseZodFormProps<Z extends z.ZodSchema>
  extends UseFormProps<z.TypeOf<Z>> {
  schema: Z;
}

export function useZodForm<T extends z.ZodSchema>({
  schema,
  ...props
}: UseZodFormProps<T>) {
  return useForm<z.infer<typeof schema>>({
    ...props,
    resolver: zodResolver(schema),
  });
}
