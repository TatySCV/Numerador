import TextInput from "../ui/TextInput";
import SelectInput from "../ui/SelectInput";
import SearchableSelect from "../ui/SearchableSelect";
import Button from "../ui/Button";

import { useNavigate } from "react-router-dom";

import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import { validateRegistrationForm } from "../../validation/registrationValidation";
import { generateReceipt } from "../../utils/receiptGenerator";

import { nationalities } from "../../data/countries";
import { documentTypes } from "../../data/documentTypes";
import { regions } from "../../data/regions";
import { visitReasons } from "../../data/visitReasons";

function RegistrationForm() {
  const navigate = useNavigate();

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    documentError,
    handleChange,
    filteredCommunes,
  } = useRegistrationForm({
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

  const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validateRegistrationForm(formData, documentError);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  const motivoSeleccionado = visitReasons.find(
    (r) => r.value === formData.motivoVisita
  );

  navigate("/receipt", {
    state: generateReceipt(motivoSeleccionado), // Pasamos el objeto, no el string
  });
};

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>

      {/* Nombres y Apellidos */}
      <div className="grid md:grid-cols-2 gap-6">
        <TextInput
          label="Nombres"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
        />
        {errors.nombres && <p className="text-red-500 text-sm">{errors.nombres}</p>}

        <TextInput
          label="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
        />
        {errors.apellidos && <p className="text-red-500 text-sm">{errors.apellidos}</p>}
      </div>

      {/* Nacionalidad */}
      <SearchableSelect
        label="Nacionalidad"
        name="nacionalidad"
        value={formData.nacionalidad}
        onChange={handleChange}
        options={nationalities}
      />
      {errors.nacionalidad && <p className="text-red-500 text-sm">{errors.nacionalidad}</p>}

      {/* Documento */}
      <div className="grid md:grid-cols-2 gap-6">
        <SelectInput
          label="Tipo de Documento"
          name="tipoDocumento"
          value={formData.tipoDocumento}
          onChange={handleChange}
          options={documentTypes}
        />
        {errors.tipoDocumento && <p className="text-red-500 text-sm">{errors.tipoDocumento}</p>}

        <TextInput
          label="Número de Documento"
          name="numeroDocumento"
          value={formData.numeroDocumento}
          onChange={handleChange}
        />
        {documentError && <p className="text-red-500 text-sm">{documentError}</p>}
      </div>

      {/* Región y Comuna */}
      <div className="grid md:grid-cols-2 gap-6">
        <SearchableSelect
          label="Región"
          name="region"
          value={formData.region}
          onChange={handleChange}
          options={regions}
        />
        {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}

        <SearchableSelect
          label="Comuna"
          name="comuna"
          value={formData.comuna}
          onChange={handleChange}
          options={filteredCommunes}
        />
        {errors.comuna && <p className="text-red-500 text-sm">{errors.comuna}</p>}
      </div>

      {/* Dirección */}
      <TextInput
        label="Dirección"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
      />
      {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion}</p>}

      {/* Contacto */}
      <div className="grid md:grid-cols-2 gap-6">
        <TextInput
          label="Teléfono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
        {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}

        <TextInput
          label="Correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
        />
        {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
      </div>

      {/* Motivo */}
      <SelectInput
        label="Motivo de Visita"
        name="motivoVisita"
        value={formData.motivoVisita}
        onChange={handleChange}
        options={visitReasons}
      />
      {errors.motivoVisita && <p className="text-red-500 text-sm">{errors.motivoVisita}</p>}

      {/* Cita */}
      <div>
        <label className="block mb-2 font-medium">
          ¿Posee cita previamente agendada?
        </label>

        <div className="flex gap-8">
          <label>
            <input
              type="radio"
              checked={formData.poseeCita}
              onChange={() =>
                setFormData((p) => ({ ...p, poseeCita: true }))
              }
            />
            Sí
          </label>

          <label>
            <input
              type="radio"
              checked={!formData.poseeCita}
              onChange={() =>
                setFormData((p) => ({ ...p, poseeCita: false }))
              }
            />
            No
          </label>
        </div>
      </div>

      {formData.poseeCita && (
        <TextInput
          label="Código de Reserva"
          name="codigoReserva"
          value={formData.codigoReserva}
          onChange={handleChange}
        />
      )}

      <Button type="submit">Generar Número</Button>
    </form>
  );
}

export default RegistrationForm;