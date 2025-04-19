import Header from "../../components/navbar/index";
import Banner from "../../components/banner/index";
import Footer from "../../components/footer/index";
import Destinations from "../../components/destinations/list";
import Gallary from "../../components/gallary";
import Reviews from "../../components/reviews";

const HomePage = () => {
  return (
    <div className="background-grey h-screen text-white capitalize">
      <Header />
      <Banner />
      <Destinations />
      <Reviews />
      <Gallary />
      <Footer />
    </div>
  );
};

export default HomePage;
