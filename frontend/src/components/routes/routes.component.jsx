import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home";
import DeleteDestination from "../destinations/delete-destination";
import GallaryImageForm from "../gallary/gallry-image-form.jsx";
import DestinationForm from "../destinations/destination-form";
import PackageForm from "../tour-packages/package-form.jsx";
import PackagesDetails from "../tour-packages/packages-details.jsx";
import DestinationDetails from "../destinations/destination-details.jsx";
import Register from "../authentication/register/index.jsx";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/destination/new" element={<DestinationForm />} />
      <Route path="/destination/edit/:id" element={<DestinationForm />} />
      <Route path="/destination/details/:id" element={<DestinationDetails />} />
      <Route path="/destination/delete" element={<DeleteDestination />} />
      <Route path="/gallary-image/new" element={<GallaryImageForm />} />
      <Route path="/gallary-image/edit/:id" element={<GallaryImageForm />} />
      <Route path="/package/new" element={<PackageForm />} />
      <Route path="/package/edit/:id" element={<PackageForm />} />
      <Route path="/package/details/:id" element={<PackagesDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
