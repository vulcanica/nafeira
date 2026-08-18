import { getRequestConfig } from "next-intl/server";

import { defaultLocale, resolveLocale } from ".";
import type ptMessages from "./messages/pt-BR.json";

const messageLoaders = {
  "en-US": () => import("./messages/en.json"),
  "pt-BR": () => import("./messages/pt-BR.json"),
} as const;

export default getRequestConfig(async () => {
  const locale = resolveLocale(defaultLocale);
  const messages = (await messageLoaders[locale]()).default as typeof ptMessages;

  return { locale, messages };
});
