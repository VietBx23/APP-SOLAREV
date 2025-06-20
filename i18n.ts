import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import vi from "./locales/vi/translation.json";

export enum ENUM_LANGUAGE {
  en = "en",
  vi = "vi",
}

export const languageResources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: ENUM_LANGUAGE.en,
  fallbackLng: ENUM_LANGUAGE.en,
  resources: languageResources,
});

export default i18next;
