export function generateReceipt(tramite) {
  return {
    numero:
      "TMP-" +
      String(Math.floor(Math.random() * 999) + 1).padStart(3, "0"),

    fecha: new Date().toLocaleDateString("es-CL"),

    tramite,
  };
}