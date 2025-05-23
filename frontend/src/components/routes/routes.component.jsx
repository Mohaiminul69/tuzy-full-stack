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
import Login from "../authentication/login/index.jsx";
import ProtectedRoute from "./protected-route.jsx";
import BookingForm from "../bookings/index.jsx";
import NotFound from "../../pages/not-found/index.jsx";
import Dashboard from "../../pages/dashboard/index.jsx";
import PublicRoute from "./public-route.jsx";
import MyBookings from "../../pages/my-bookings/index.jsx";
import DeletePackage from "../tour-packages/delete-package.jsx";
import DeleteGallaryImage from "../gallary/delete-gallary-image.jsx";
import UserProfile from "../../pages/user-profile/index.jsx";
import BookingList from "../bookings/list.jsx";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/book/:tourType/:id" element={<BookingForm />} />
      </Route>
      <Route element={<ProtectedRoute isDashboard={true} />}>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Route>
      <Route element={<ProtectedRoute isDashboard={true} isAdminOnly={true} />}>
        <Route path="/package/new" element={<PackageForm />} />
        <Route path="/destination/new" element={<DestinationForm />} />
        <Route path="/destination/edit/:id" element={<DestinationForm />} />
        <Route path="/destination/delete" element={<DeleteDestination />} />
        <Route path="/package/delete" element={<DeletePackage />} />
        <Route path="/gallary-image/delete" element={<DeleteGallaryImage />} />
        <Route path="/package/edit/:id" element={<PackageForm />} />
        <Route path="/gallary-image/new" element={<GallaryImageForm />} />
        <Route path="/gallary-image/edit/:id" element={<GallaryImageForm />} />
        <Route path="/manage-bookings" element={<BookingList />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route
          path="/destination/details/:id"
          element={<DestinationDetails />}
        />
        <Route path="/package/details/:id" element={<PackagesDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
