import Banner from "../../components/banner/index";
import Destinations from "../../components/destinations/list";
import Gallary from "../../components/gallary";
import Reviews from "../../components/reviews";
import Packages from "../../components/tour-packages/list";

const HomePage = () => (
  <>
    <Banner />
    <Destinations />
    <Packages />
    <Reviews />
    <Gallary />
  </>
);

export default HomePage;
