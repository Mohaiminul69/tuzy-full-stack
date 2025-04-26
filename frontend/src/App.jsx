import RoutesComponent from "./components/routes/routes.component";
import Footer from "./components/footer/index";
import Header from "./components/navbar";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <RoutesComponent />
      <Footer />
    </>
  );
}

export default App;
