import { useState, useEffect } from "react";

import TextInput from "../ui/TextInput";
import SelectInput from "../ui/SelectInput";
import SearchableSelect from "../ui/SearchableSelect";
import Button from "../ui/Button";

import { useNavigate } from "react-router-dom";

import {
  validateRut,
  validatePassport,
  validateDni,
  validateOtherDocument,
} from "../../utils/documentValidators";

import { nationalities } from "../../data/countries";
import { documentTypes } from "../../data/documentTypes";
import { regions } from "../../data/regions";
import { communes } from "../../data/communes";
import { visitReasons } from "../../data/visitReasons";

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    nacionalidad: "",
    tipoDocumento: "",
    numeroDocumento: "",
    region: "",
    comuna: "",
    direccion: "",
    telefono: "",
    correo: "",
    motivoVisita: "",
    poseeCita: false,
    codigoReserva: "",
  });

  const [documentError, setDocumentError] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

      default:
        valid = true;
    }

    if (!valid) {
      setDocumentError("Documento inválido.");
    } else {
      setDocumentError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombres.trim()) {
      newErrors.nombres = "Ingrese los nombres";
    }

    if (!formData.apellidos.trim()) {
      newErrors.apellidos = "Ingrese los apellidos";
    }

    if (!formData.nacionalidad) {
      newErrors.nacionalidad = "Seleccione una nacionalidad";
    }

    if (!formData.tipoDocumento) {
      newErrors.tipoDocumento = "Seleccione un tipo de documento";
    }

    if (!formData.numeroDocumento) {
      newErrors.numeroDocumento = "Ingrese un documento";
    }

    if (documentError) {
      newErrors.numeroDocumento = "Documento inválido";
    }

    if (!formData.region) {
      newErrors.region = "Seleccione una región";
    }

    if (!formData.comuna) {
      newErrors.comuna = "Seleccione una comuna";
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = "Ingrese una dirección";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "Ingrese un teléfono";
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "Ingrese un correo";
    }

    if (!formData.motivoVisita) {
      newErrors.motivoVisita = "Seleccione un motivo";
    }

    if (formData.poseeCita && !formData.codigoReserva.trim()) {
      newErrors.codigoReserva = "Ingrese código de reserva";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateDocument();
  }, [formData.tipoDocumento, formData.numeroDocumento]);

  const filteredCommunes = communes.filter(
    (commune) => commune.region === formData.region,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const generatedReceipt = {
      numero:
        "TMP-" + String(Math.floor(Math.random() * 999) + 1).padStart(3, "0"),

      fecha: new Date().toLocaleDateString("es-CL"),

      tramite: formData.motivoVisita,
    };

    navigate("/receipt", {
      state: generatedReceipt,
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Nombres y Apellidos */}
      <div className="grid md:grid-cols-2 gap-6">
        <TextInput
          label="Nombres"
          required
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
        />
        {errors.nombres && (
          <p className="text-red-500 text-sm">{errors.nombres}</p>
        )}
        <TextInput
          label="Apellidos"
          required
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
        />
        {errors.apellidos && (
          <p className="text-red-500 text-sm">{errors.apellidos}</p>
        )}
      </div>

      {/* Nacionalidad */}
      <SearchableSelect
        label="Nacionalidad"
        required
        name="nacionalidad"
        value={formData.nacionalidad}
        onChange={handleChange}
        options={nationalities}
      />
      {errors.nacionalidad && (
        <p className="text-red-500 text-sm">{errors.nacionalidad}</p>
      )}
      {/* Documento */}
      <div className="grid md:grid-cols-2 gap-6">
        <SelectInput
          label="Tipo de Documento"
          required
          name="tipoDocumento"
          value={formData.tipoDocumento}
          onChange={handleChange}
          options={documentTypes}
        />
        {errors.tipoDocumento && (
          <p className="text-red-500 text-sm">{errors.tipoDocumento}</p>
        )}

        <div>
          <TextInput
            label="Número de Documento"
            required
            name="numeroDocumento"
            value={formData.numeroDocumento}
            onChange={handleChange}
          />
          {documentError && (
            <p className="text-red-500 text-sm mt-1">{documentError}</p>
          )}
        </div>
      </div>

      {/* Región y Comuna */}
      <div className="grid md:grid-cols-2 gap-6">
        <SearchableSelect
          label="Región"
          required
          name="region"
          value={formData.region}
          onChange={handleChange}
          options={regions}
        />
        {errors.region && (
          <p className="text-red-500 text-sm">{errors.region}</p>
        )}
        <SearchableSelect
          label="Comuna"
          required
          name="comuna"
          value={formData.comuna}
          onChange={handleChange}
          options={filteredCommunes}
        />
        {errors.comuna && (
          <p className="text-red-500 text-sm">{errors.comuna}</p>
        )}
      </div>

      {/* Dirección */}
      <TextInput
        label="Dirección Residencia Actual"
        required
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
      />
      {errors.direccion && (
        <p className="text-red-500 text-sm">{errors.direccion}</p>
      )}

      {/* Contacto */}
      <div className="grid md:grid-cols-2 gap-6">
        <TextInput
          label="Teléfono Contacto"
          required
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
        {errors.telefono && (
          <p className="text-red-500 text-sm">{errors.telefono}</p>
        )}

        <TextInput
          label="Correo Contacto"
          type="email"
          required
          name="correo"
          value={formData.correo}
          onChange={handleChange}
        />
        {errors.correo && (
          <p className="text-red-500 text-sm">{errors.correo}</p>
        )}
      </div>

      {/* Motivo */}
      <SelectInput
        label="Motivo de Visita"
        required
        name="motivoVisita"
        value={formData.motivoVisita}
        onChange={handleChange}
        options={visitReasons}
      />
      {errors.motivoVisita && (
        <p className="text-red-500 text-sm">{errors.motivoVisita}</p>
      )}

      {/* Cita previa */}
      <div>
        <label className="block mb-2 font-medium">
          ¿Posee cita previamente agendada?
        </label>

        <div className="flex gap-8">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="poseeCita"
              checked={formData.poseeCita}
              onChange={() =>
                setFormData((prev) => ({
                  ...prev,
                  poseeCita: true,
                }))
              }
            />
            Sí
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="poseeCita"
              checked={!formData.poseeCita}
              onChange={() =>
                setFormData((prev) => ({
                  ...prev,
                  poseeCita: false,
                }))
              }
            />
            No
          </label>
        </div>
      </div>

      {/* Código reserva */}
      {formData.poseeCita && (
        <TextInput
          label="Código de Reserva"
          required
          name="codigoReserva"
          value={formData.codigoReserva}
          onChange={handleChange}
        />
      )}

      {/* Botón */}
      <Button type="submit">Generar Número</Button>

      {/* Debug temporal */}
      <pre className="bg-slate-100 p-4 rounded-lg text-sm overflow-auto">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </form>
  );
}

export default RegistrationForm;
