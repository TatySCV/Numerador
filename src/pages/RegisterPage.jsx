import MainLayout from "../components/layout/MainLayout";
import RegistrationForm from "../components/form/RegistrationForm";

function RegisterPage() {
  return (
    <MainLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Registro de Atención
        </h1>

        <p className="text-slate-500 mt-2">
          Complete los datos solicitados para generar su número de atención.
        </p>
      </div>

      <RegistrationForm />

    </MainLayout>
  );
}

export default RegisterPage;