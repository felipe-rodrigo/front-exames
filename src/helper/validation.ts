export const validationRequired = (val: any) => ![undefined, null, 0, ''].includes(val) || 'Campo obrigatório';
export const validationStringMaxMin = (val: string, min: number, max: number) => {
  if (val.length < min)
    return `Mínimo de caracteres ${min}`;
  else if (val.length > max)
    return `Máximo de caracteres ${max}`;
  return true;
};

export const validationMaxMin = (val: number, min: number, max: number) => {
  if (val < min)
    return `Mínimo ${min}`;
  else if (val > max)
    return `Máximo ${max}`;
  return true;
}
