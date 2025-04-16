import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home";
import DeleteDestination from "../destinations/delete-destination";
import GallaryImageForm from "../gallary/gallry-image-form.jsx";
import DestinationForm from "../destinations/destination-form";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/destination/new" element={<DestinationForm />} />
      <Route path="/destination/edit/:id" element={<DestinationForm />} />
      <Route path="/destination/delete" element={<DeleteDestination />} />
      <Route path="/gallary-image/new" element={<GallaryImageForm />} />
      <Route path="/gallary-image/edit/:id" element={<GallaryImageForm />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
