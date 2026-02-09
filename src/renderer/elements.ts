export default {
  strengthElement: document.querySelector<HTMLDivElement>(".js-strength")!,
  copyButton: document.querySelector<HTMLButtonElement>(".js-copy")!,
  generatorButton: document.querySelector<HTMLButtonElement>(".js-generator")!,
  passwordInput: document.querySelector<HTMLInputElement>(".js-password")!,
  lengthInput: document.querySelector<HTMLInputElement>("#length")!,
  uppercaseCheckbox: document.querySelector<HTMLInputElement>("#uppercase")!,
  lowercaseCheckbox: document.querySelector<HTMLInputElement>("#lowercase")!,
  digitsCheckbox: document.querySelector<HTMLInputElement>("#digits")!,
  specialCheckbox: document.querySelector<HTMLInputElement>("#special")!,
};
