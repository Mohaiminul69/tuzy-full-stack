import React from "react";
import DetailsPage from "../shared/details-page";
import { useGetSingleDestinationQuery } from "../../api/destinations";

const DestinationDetails = () => (
  <DetailsPage callback={useGetSingleDestinationQuery} dataType="destination" />
);

export default DestinationDetails;
