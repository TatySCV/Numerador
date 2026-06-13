export function validateRegistrationForm(formData, documentError) {
  const newErrors = {};

  if (!formData.nombres.trim()) newErrors.nombres = "Ingrese los nombres";
  if (!formData.apellidos.trim()) newErrors.apellidos = "Ingrese los apellidos";
  if (!formData.nacionalidad) newErrors.nacionalidad = "Seleccione una nacionalidad";
  if (!formData.tipoDocumento) newErrors.tipoDocumento = "Seleccione un tipo de documento";
  if (!formData.numeroDocumento) newErrors.numeroDocumento = "Ingrese un documento";

  if (documentError) {
    newErrors.numeroDocumento = "Documento inválido";
  }

  if (!formData.region) newErrors.region = "Seleccione una región";
  if (!formData.comuna) newErrors.comuna = "Seleccione una comuna";
  if (!formData.direccion.trim()) newErrors.direccion = "Ingrese una dirección";
  if (!formData.telefono.trim()) newErrors.telefono = "Ingrese un teléfono";
  if (!formData.correo.trim()) newErrors.correo = "Ingrese un correo";
  if (!formData.motivoVisita) newErrors.motivoVisita = "Seleccione un motivo";

  if (formData.poseeCita && !formData.codigoReserva.trim()) {
    newErrors.codigoReserva = "Ingrese código de reserva";
  }

  return newErrors;
}