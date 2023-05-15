import backArrow from "@/assets/svg/back-arrow.svg";
import bank from "@/assets/svg/bank.svg";
import bell from "@/assets/svg/bell.svg";
import btc from "@/assets/svg/btc.svg";
import calendar from "@/assets/svg/calendar.svg";
import cancel from "@/assets/svg/cancel.svg";
import card from "@/assets/svg/card.svg";
import check from "@/assets/svg/check.svg";
import chevronRight from "@/assets/svg/chevron-right.svg";
import deleteIcon from "@/assets/svg/delete.svg";
import ellipses from "@/assets/svg/ellipses.svg";
import eye from "@/assets/svg/eye.svg";
import eyeOff from "@/assets/svg/eye-off.svg";
import forwardArrow from "@/assets/svg/forward-arrow.svg";
import gear from "@/assets/svg/gear.svg";
import ngnBank from "@/assets/svg/ngn-bank.svg";
import notice from "@/assets/svg/notice.svg";
import plus from "@/assets/svg/plus.svg";
import question from "@/assets/svg/question.svg";
import rise from "@/assets/svg/rise.svg";
import share from "@/assets/svg/share.svg";
import upArrow from "@/assets/svg/up-arrow.svg";
import usdCard from "@/assets/svg/usd-card.svg";

export const IconPack = {
  "back-arrow": backArrow,
  bank,
  bell,
  btc,
  calendar,
  cancel,
  card,
  check,
  "chevron-right": chevronRight,
  delete: deleteIcon,
  ellipses,
  eye,
  "eye-off": eyeOff,
  "forward-arrow": forwardArrow,
  gear,
  "ngn-bank": ngnBank,
  notice,
  plus,
  question,
  rise,
  share,
  "up-arrow": upArrow,
  "usd-card": usdCard,
};

export type IconName = keyof typeof IconPack;
