import backArrow from "@/assets/svg/back-arrow.svg";
import bell from "@/assets/svg/bell.svg";
import calendar from "@/assets/svg/calendar.svg";
import cancel from "@/assets/svg/cancel.svg";
import check from "@/assets/svg/check.svg";
import chevronRight from "@/assets/svg/chevron-right.svg";
import deleteIcon from "@/assets/svg/delete.svg";
import eye from "@/assets/svg/eye.svg";
import eyeOff from "@/assets/svg/eye-off.svg";
import gear from "@/assets/svg/gear.svg";
import plus from "@/assets/svg/plus.svg";
import question from "@/assets/svg/question.svg";
import rise from "@/assets/svg/rise.svg";
import share from "@/assets/svg/share.svg";
import upArrow from "@/assets/svg/up-arrow.svg";

export const IconPack = {
  "back-arrow": backArrow,
  bell,
  calendar,
  cancel,
  check,
  "chevron-right": chevronRight,
  delete: deleteIcon,
  eye,
  "eye-off": eyeOff,
  gear,
  plus,
  question,
  rise,
  share,
  "up-arrow": upArrow,
};

export type IconName = keyof typeof IconPack;
