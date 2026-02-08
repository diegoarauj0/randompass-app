import "./index.css";

const strengthElement = document.querySelector(".js-strength");
const copyButtonElement = document.querySelector(".js-copy");
const generatorButtonElement = document.querySelector(".js-generator");
const passowrdElement =
  document.querySelector<HTMLInputElement>(".js-password");

const lenghtElement = document.querySelector<HTMLInputElement>("#length");

const uppercaseCheckboxElement =
  document.querySelector<HTMLInputElement>("#uppercase");
const lowercaseCheckboxElement =
  document.querySelector<HTMLInputElement>("#lowercase");
const digitsCheckboxElement =
  document.querySelector<HTMLInputElement>("#digits");
const specialCheckboxElement =
  document.querySelector<HTMLInputElement>("#special");

type PasswordStrength = "weak" | "average" | "strong";

function checkPasswordStrength(password: string): {
  score: number;
  strength: PasswordStrength;
} {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  let strength: PasswordStrength;

  if (score <= 2) strength = "weak";
  else if (score <= 4) strength = "average";
  else strength = "strong";

  return { score, strength };
}

document.querySelector(".js-password").addEventListener("input", (e: any) => {
  const password = e?.target?.value;
  const result = checkPasswordStrength(password || "");

  strengthElement.classList.remove("weak");
  strengthElement.classList.remove("average");
  strengthElement.classList.remove("strong");
  strengthElement.classList.add(result.strength);
});

function passwordGenerator(
  length: number,
  {
    digits,
    lowercase,
    uppercase,
    special,
  }: {
    digits?: boolean;
    uppercase?: boolean;
    lowercase?: boolean;
    special?: boolean;
  },
): string {
  let characters = "";

  characters += uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
  characters += lowercase ? "abcdefghijklmnopqrstuvwxyz" : "";
  characters += digits ? "0123456789" : "";
  characters += special ? "!@#$%^&*()_+-=[]{}|;:,.<>?" : "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = "";

  for (let i = 0; i < length; i++) {
    password += characters[array[i] % characters.length];
  }

  return password;
}

generatorButtonElement.addEventListener("click", () => {
  console.log(lenghtElement.value)
  const password = passwordGenerator(Number(lenghtElement.value), {
    digits: digitsCheckboxElement.value === "on",
    lowercase: lowercaseCheckboxElement.value === "on",
    uppercase: uppercaseCheckboxElement.value === "on",
    special: specialCheckboxElement.value === "on",
  });

  passowrdElement.value = password;

  const result = checkPasswordStrength(password || "");

  strengthElement.classList.remove("weak");
  strengthElement.classList.remove("average");
  strengthElement.classList.remove("strong");
  strengthElement.classList.add(result.strength);
});

copyButtonElement.addEventListener("click", () => {
  navigator.clipboard.writeText(passowrdElement.value);
});
