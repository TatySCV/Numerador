import { useState, useEffect, useMemo } from "react";

import {
  validateRut,
  validatePassport,
  validateDni,
  validateOtherDocument,
} from "../utils/documentValidators";

import { communes } from "../data/communes";

export function useRegistrationForm(initialState) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [documentError, setDocumentError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validación documento
  const validateDocument = () => {
    const { tipoDocumento, numeroDocumento } = formData;

    if (!numeroDocumento) {
      setDocumentError("");
      return;
    }

    let valid = true;

    switch (tipoDocumento) {
      case "ci":
        valid = validateRut(numeroDocumento);
        break;
      case "pasaporte":
        valid = validatePassport(numeroDocumento);
        break;
      case "dni":
        valid = validateDni(numeroDocumento);
        break;
      case "otro":
        valid = validateOtherDocument(numeroDocumento);
        break;
    }

    setDocumentError(valid ? "" : "Documento inválido.");
  };

  useEffect(() => {
    validateDocument();
  }, [formData.tipoDocumento, formData.numeroDocumento]);

  // Comunas filtradas (derivado del estado)
  const filteredCommunes = useMemo(() => {
    if (!formData.region) return [];

    return communes.filter(
      (c) => c.region === formData.region
    );
  }, [formData.region]);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    documentError,
    handleChange,
    filteredCommunes,
  };
}