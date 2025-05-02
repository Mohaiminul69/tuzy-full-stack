import React from "react";
import DetailsPage from "../shared/details-page";
import { useGetSingleDestinationQuery } from "../../api/destinations";

const DestinationDetails = () => (
  <DetailsPage callback={useGetSingleDestinationQuery} tourType="destination" />
);

export default DestinationDetails;
