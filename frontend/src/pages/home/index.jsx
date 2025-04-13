import React from "react";
import Header from "../../components/navbar/index";
import Banner from "../../components/banner/index";
import Footer from "../../components/footer/index";
import Destinations from "../../components/destinations/list";

const HomePage = () => {
  return (
    <div className="bg-[#c8c6c6] h-screen text-white capitalize">
      <Header />
      <Banner />
      <Destinations />
      <Footer />
    </div>
  );
};

export default HomePage;
