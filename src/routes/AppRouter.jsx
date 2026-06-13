import { HashRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "../pages/RegisterPage";
import ReceiptPage from "../pages/ReceiptPage";

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;