import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "../pages/RegisterPage";
import ReceiptPage from "../pages/ReceiptPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;