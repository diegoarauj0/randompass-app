const strengthElement = document.querySelector(".js-strength");

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
