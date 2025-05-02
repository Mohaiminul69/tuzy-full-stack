import React from "react";
import DetailsPage from "../shared/details-page";
import { useGetSinglePackageQuery } from "../../api/packages";

const PackagesDetails = () => (
  <DetailsPage callback={useGetSinglePackageQuery} tourType="package" />
);

export default PackagesDetails;
