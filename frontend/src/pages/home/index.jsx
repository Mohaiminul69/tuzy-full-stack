import Banner from "../../components/banner/index";
import Destinations from "../../components/destinations/list";
import Footer from "../../components/footer";
import Gallary from "../../components/gallary";
import Header from "../../components/navbar";
import Reviews from "../../components/reviews";
import Packages from "../../components/tour-packages/list";

const HomePage = () => (
  <>
    <Header />
    <Banner />
    <Destinations />
    <Packages />
    <Reviews />
    <Gallary />
    <Footer />
  </>
);

export default HomePage;
