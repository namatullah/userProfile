import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {English} from "./languages/English";
import {Persian} from "./languages/Persian";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: English
        },
        fa: {
            translations: Persian
        },
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
