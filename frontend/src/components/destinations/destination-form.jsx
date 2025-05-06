import React from "react";
import CreateUpdateForm from "../shared/forms/create-update-form";
import {
  useCreateDestinationMutation,
  useGetSingleDestinationQuery,
  useUpdateDestinationMutation,
} from "../../api/destinations";
import { useParams } from "react-router-dom";

const formfields = [
  {
    fieldName: "name",
    label: "name",
    placeholder: "Please enter destination name",
  },
  {
    fieldName: "price",
    label: "price",
    placeholder: "Please enter destination price",
  },
  {
    fieldName: "short_description",
    label: "short description",
    placeholder: "Please enter a short description about the destination",
  },
  {
    fieldName: "description",
    label: "description",
    placeholder: "Please enter a details about the destination",
  },
  {
    fieldName: "img_src",
    label: "image source",
    placeholder: "Please enter image URL",
  },
];

const DestinationForm = () => {
  const { id } = useParams();
  const [createDestination] = useCreateDestinationMutation();
  const [updateDestination] = useUpdateDestinationMutation();
  const { data = {} } = useGetSingleDestinationQuery(id, {
    skip: !id,
  });
  const callback = id ? updateDestination : createDestination;
  const title = id ? "update destination" : "add destination";
  const alertText = id ? "destination updated" : "destination added";

  return (
    <CreateUpdateForm
      title={title}
      formfields={formfields}
      callback={callback}
      defaultValues={data?.destination}
      alertText={alertText}
    />
  );
};

export default DestinationForm;
