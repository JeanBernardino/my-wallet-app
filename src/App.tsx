import { useAuth } from './hooks';
import { Login, DashboardLayout, Dashboard } from './components';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003300] to-[#006600]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#ccffcc] border-t-[#009900] mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-[#66cc66] opacity-20 blur-xl"></div>
          </div>
          <p className="mt-6 text-[#ccffcc] font-semibold text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}

export default App;

