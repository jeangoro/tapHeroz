import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./translations/en.json";
import frTranslations from "./translations/fr.json";

const languesSupportees = ["en", "fr"];
// Récupérer la langue par défaut du navigateur
const langueParDefaut = navigator.language || navigator.userLanguage;
const langueNavigateur = langueParDefaut.split("-")[0];

// Vérifier si la langue par défaut est supportée, sinon utiliser le français
const langueUtilisee = languesSupportees.includes(langueNavigateur) ? langueNavigateur : "fr";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },

    fr: {
      translation: frTranslations,
    },
  },

  lng: langueUtilisee, // langue par défaut
  fallbackLng: "en", // langue de secours si la traduction n'est pas trouvée

  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
