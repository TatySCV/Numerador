export function generateReceipt(motivoObjeto) {
  // motivoObjeto es algo como { value: "...", label: "...", letter: "..." }
  
  return {
    // Usamos la letra del motivo para el número (ej: D-002)
    numero: `${motivoObjeto.letter}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`,
    
    fecha: new Date().toLocaleDateString("es-CL"),
    
    // AQUÍ USAMOS EL LABEL
    tramite: motivoObjeto.label,
    
    // Pasamos también la letra para usarla en el sector
    sector: motivoObjeto.letter 
  };
}