import MainLayout from "../components/layout/MainLayout";
import RegistrationForm from "../components/form/RegistrationForm";

function RegisterPage() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e3a8a] uppercase tracking-wide text-center">
          JEFATURA NACIONAL DE MIGRACIONES Y POLICÍA INTERNACIONAL
        </h1>
        <p className="text-[#7b7c7f] mt-1 font-medium text-center">
          Sistema de Registro de Atención
        </p>
      </div>

      <RegistrationForm />
    </MainLayout>
  );
}

export default RegisterPage;
