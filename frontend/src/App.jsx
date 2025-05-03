import RoutesComponent from "./components/routes/routes.component";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthProvider";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <RoutesComponent />
      <Toaster position="bottom-center" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;
