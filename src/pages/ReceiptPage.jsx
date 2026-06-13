import { useLocation, useNavigate } from "react-router-dom";

import ReceiptCard from "../components/receipt/ReceiptCard";
import Button from "../components/ui/Button";

function ReceiptPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const receipt = location.state;

  if (!receipt) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          No existe comprobante
        </h2>

        <Button
          onClick={() => navigate("/")}
        >
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReceiptCard receipt={receipt} />

      <div className="flex justify-center">
        <Button
          onClick={() => navigate("/")}
        >
          Nuevo Registro
        </Button>
      </div>
    </div>
  );
}

export default ReceiptPage;