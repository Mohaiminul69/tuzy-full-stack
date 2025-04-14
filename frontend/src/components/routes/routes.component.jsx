import React from "react";
import { Route, Routes } from "react-router-dom";
import DestinationForm from "../destination-form";
import HomePage from "../../pages/home";
import DeleteDestination from "../destinations/delete-destination";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/destination/new" element={<DestinationForm />} />
      <Route path="/destination/edit/:id" element={<DestinationForm />} />
      <Route path="/destination/delete" element={<DeleteDestination />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
