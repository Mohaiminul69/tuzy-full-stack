import RoutesComponent from "./components/routes/routes.component";
import Header from "./components/navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer";
import { AuthProvider } from "./contexts/AuthProvider";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Header />
      <RoutesComponent />
      <Footer />
      <Toaster position="bottom-center" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;
