import React from "react";
import { Route, Routes } from "react-router-dom";
import DestinationForm from "../destination-form";
import HomePage from "../../pages/home";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/destination/new" element={<DestinationForm />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
