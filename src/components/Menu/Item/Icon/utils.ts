import { IconName } from "./types";

import boltUrl from "./bolt.svg";
import dotUrl from "./dot.svg";
import inboxUrl from "./inbox.svg";
import loaderUrl from "./loader.svg";
import pencilUrl from "./pencil.svg";
import rescheduleUrl from "./reschedule.svg";

export const iconMapping: { [k in IconName]: string } = {
  bolt: boltUrl,
  dot: dotUrl,
  inbox: inboxUrl,
  loader: loaderUrl,
  pencil: pencilUrl,
  reschedule: rescheduleUrl,
};
