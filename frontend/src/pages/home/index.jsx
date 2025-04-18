import React from "react";
import Header from "../../components/navbar/index";
import Banner from "../../components/banner/index";
import Footer from "../../components/footer/index";
import Destinations from "../../components/destinations/list";
import Gallary from "../../components/gallary";

const HomePage = () => {
  return (
    <div className="background-grey h-screen text-white capitalize">
      <Header />
      <Banner />
      <Destinations />
      <Gallary />
      <Footer />
    </div>
  );
};

export default HomePage;
