import React from "react";
import DeletePage from "../shared/delete-page";
import {
  useDeleteDestinationMutation,
  useGetDestinationsQuery,
} from "../../api/destinations";

const DeleteDestination = () => (
  <DeletePage
    getCollectionCallback={useGetDestinationsQuery}
    deleteCallBack={useDeleteDestinationMutation}
    title="Manage Destinations"
    type="destination"
    alertText="Destination deleted"
    confirmTitle="Delete Destination"
  />
);

export default DeleteDestination;
