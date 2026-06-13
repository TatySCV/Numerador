function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;