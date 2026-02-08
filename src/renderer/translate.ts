const locales = {
  "pt-BR": {
    title: "RandomPass",
    copy: "Copiar",
    weak: "Fraca",
    average: "Média",
    strong: "Forte",
    lowercase: "Letras minúsculas",
    uppercase: "Letras maiúsculas",
    digits: "Números",
    specialCharacters: "Caracteres especiais",
    passwordLength: "Comprimento da senha",
    includeCharacters: "Incluir caracteres",
  },

  en: {
    title: "RandomPass",
    copy: "Copy",
    weak: "Weak",
    average: "Average",
    strong: "Strong",
    lowercase: "Lowercase letters",
    uppercase: "Uppercase letters",
    digits: "Digits",
    specialCharacters: "Special characters",
    passwordLength: "Password length",
    includeCharacters: "Include characters",
  },
} as const;

type Locale = keyof typeof locales;
type TranslationKey = keyof (typeof locales)["en"];

const DEFAULT_LOCALE: Locale = "en";

function getCurrentLocale(): Locale {
  const stored = localStorage.getItem("locale");
  return stored && stored in locales ? (stored as Locale) : DEFAULT_LOCALE;
}

function setLocale(locale: Locale) {
  localStorage.setItem("locale", locale);
  applyTranslations(locale);
}

function applyTranslations(locale: Locale) {
  const elements = document.querySelectorAll<HTMLElement>("[data-language]");

  elements.forEach((element) => {
    const key = element.dataset.language as TranslationKey;
    const translation = locales[locale][key];

    if (translation) {
      element.textContent = translation;
    }
  });
}

applyTranslations(getCurrentLocale());

document
  .querySelector(".js-language-display-button")
  ?.addEventListener("click", () => {
    document.querySelector(".js-language")?.classList.toggle("hidden");
  });

document
  .querySelectorAll<HTMLButtonElement>(".js-language-button")
  .forEach((button) => {
    button.addEventListener("click", () => {
      setLocale(button.id as any);
      document.querySelector(".js-language")?.classList.toggle("hidden");
    });
  });
