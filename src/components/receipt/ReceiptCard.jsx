// En src/components/receipt/ReceiptCard.jsx
function ReceiptCard({ receipt }) {
  return (
    <div className="border-4 border-[#1e3a8a] rounded-lg p-8 max-w-sm mx-auto bg-white text-center">
      <h2 className="text-xl font-bold text-[#1e3a8a] uppercase">REGISTRO EXITOSO</h2>
      <p className="mt-4 font-semibold text-slate-700">MARIA PEREZ</p>
      <p className="text-sm text-slate-500">Su número de atención es:</p>
      
      {/* Aquí el número grande en color "oro/amarillo" */}
      <p className="text-6xl font-black text-yellow-600 my-4">
        {receipt.numero}
      </p>

      <p className="font-bold text-[#1e3a8a] uppercase">{receipt.tramite}</p>
      <div className="mt-4 text-sm text-slate-600">
        <p>Fecha: {receipt.fecha}</p>
        <p>Hora: {new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
      
      <p className="mt-6 font-bold text-[#1e3a8a]">Diríjase al sector D</p>
      <p className="text-xs text-slate-500 mt-2">Espere el llamado del personal.</p>
    </div>
  );
}

export default ReceiptCard;