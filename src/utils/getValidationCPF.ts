export function getValidationCPF(value: string) {
  if (value.split("").length === 11) {
    let cpf = value.split("");

    let sum = 0;
    let rest = 0;

    for (let i = 1; i <= 9; i++) {
      sum += Number(cpf[i - 1]) * (11 - i);
    }

    rest = 11 - (sum % 11);

    rest === 0 || rest === 1
      ? cpf[9] === "0"
        ? true
        : false
      : String(rest) === cpf[9]
      ? true
      : false;

    for (let i = 1; i <= 10; i++) {
      sum += Number(cpf[i - 1]) * (12 - i);
    }

    rest = 11 - (sum % 11);

    rest === 0 || rest === 1
      ? cpf[10] === "0"
        ? true
        : false
      : String(rest) === cpf[10]
      ? true
      : false;

    for (let i = 1; i <= 10; i++) {
      sum += Number(cpf[i - 1]) * (12 - i);
    }

    return true;
  } else {
    return false;
  }
}
