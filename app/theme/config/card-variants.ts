import { px } from "@/constants";

export const cardVariants = {
  border: {
    borderColor: "cardColorB",
    borderRadius: "xl",
    borderWidth: px(1),
    paddingBottom: "xl",
    paddingHorizontal: "l",
    paddingTop: "l",
  },
  dashed: {
    alignItems: "center",
    backgroundColor: "mainBg",
    borderColor: "cardColorB",
    borderRadius: "xl",
    borderStyle: "dashed",
    borderWidth: px(2),
    justifyContent: "center",
  },
  defaults: {},
  primary: {
    backgroundColor: "primary500",
    borderRadius: "l",
    paddingHorizontal: "sl",
    paddingVertical: "xxl",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  secondary: {
    backgroundColor: "cardColorA",
    borderRadius: "l",
    paddingHorizontal: "sl",
    paddingVertical: "xxl",
  },
};
