function ReceiptCard({ receipt }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">
          Número Generado
        </h2>

        <p className="text-slate-500 mt-2">
          Su solicitud fue registrada correctamente.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500">
            Número de Atención
          </p>

          <p className="text-4xl font-bold">
            {receipt.numero}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Fecha
          </p>

          <p className="font-medium">
            {receipt.fecha}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Trámite
          </p>

          <p className="font-medium">
            {receipt.tramite}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReceiptCard;