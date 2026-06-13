export const validateRut = (rut) => {
  if (!rut) return false;

  const cleanRut = rut
    .replace(/\./g, "")
    .replace(/-/g, "")
    .toUpperCase();

  if (cleanRut.length < 2) {
    return false;
  }

  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * multiplier;

    multiplier++;

    if (multiplier > 7) {
      multiplier = 2;
    }
  }

  const remainder = 11 - (sum % 11);

  let expectedDv = "";

  if (remainder === 11) {
    expectedDv = "0";
  } else if (remainder === 10) {
    expectedDv = "K";
  } else {
    expectedDv = String(remainder);
  }

  return expectedDv === dv;
};

export const validatePassport = (value) => {
  return /^[A-Za-z0-9]{5,20}$/.test(value);
};

export const validateDni = (value) => {
  return /^[A-Za-z0-9]{5,20}$/.test(value);
};

export const validateOtherDocument = (value) => {
  return value.trim().length >= 3;
};