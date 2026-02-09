import "./translate";
import "./index.css";
import elements from "./elements";

type PasswordStrength = "weak" | "average" | "strong";

function checkPasswordStrength(password: string): PasswordStrength {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 4) return "average";
  return "strong";
}

function updateStrengthUI(password: string) {
  const strength = checkPasswordStrength(password);

  elements.strengthElement.classList.remove("weak", "average", "strong");
  elements.strengthElement.classList.add(strength);
}

function generatePassword(
  length: number,
  options: {
    digits: boolean;
    uppercase: boolean;
    lowercase: boolean;
    special: boolean;
  },
): string {
  let characters = "";

  if (options.uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (options.lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
  if (options.digits) characters += "0123456789";
  if (options.special) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (!characters) {
    throw new Error("Selecione ao menos um tipo de caractere");
  }

  const values = new Uint32Array(length);
  crypto.getRandomValues(values);

  return Array.from(values, (v) => characters[v % characters.length]).join("");
}

elements.passwordInput.addEventListener("input", (event) => {
  updateStrengthUI((event.target as HTMLInputElement).value);
});

elements.copyButton.addEventListener("click", async () => {
  if (elements.passwordInput.value.length <= 0) {
    return;
  }

  await navigator.clipboard.writeText(elements.passwordInput.value);
  new Notification("Senha copiada para a area de transferenica");
});

elements.generatorButton.addEventListener("click", () => {
  try {
    const password = generatePassword(Number(elements.lengthInput.value), {
      uppercase: elements.uppercaseCheckbox.checked,
      lowercase: elements.lowercaseCheckbox.checked,
      digits: elements.digitsCheckbox.checked,
      special: elements.specialCheckbox.checked,
    });

    elements.passwordInput.value = password;
    updateStrengthUI(password);
  } catch (err) {
    alert(err instanceof Error ? err.message : "Erro ao gerar senha");
  }
});
