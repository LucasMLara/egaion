export const formatCpf = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");
  const maxDigits = cleanedValue.slice(0, 11);
  return maxDigits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const formatCnpj = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");
  const maxDigits = cleanedValue.slice(0, 14);
  return maxDigits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

export const formatPhone = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");
  const maxDigits = cleanedValue.slice(0, 11);

  return maxDigits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};
