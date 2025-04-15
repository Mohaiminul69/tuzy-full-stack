import React from "react";
import { Route, Routes } from "react-router-dom";
import DestinationForm from "../forms/destination-form";
import HomePage from "../../pages/home";
import DeleteDestination from "../destinations/delete-destination";
import GallaryImageForm from "../forms/gallary-image-form";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/destination/new" element={<DestinationForm />} />
      <Route path="/destination/edit/:id" element={<DestinationForm />} />
      <Route path="/gallary-image/new" element={<GallaryImageForm />} />
      <Route path="/destination/delete" element={<DeleteDestination />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
