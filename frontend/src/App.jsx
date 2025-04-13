import { useGetPingQuery } from "./api";
import Footer from "./components/footer";
import Header from "./components/navbar";
import "./App.css";
import Banner from "./components/banner";

function App() {
  const { data } = useGetPingQuery();

  return (
    <div className="bg-[#c8c6c6] h-screen text-white capitalize">
      <Header />
      <Banner />
      <Footer data={data} />
    </div>
  );
}

export default App;
