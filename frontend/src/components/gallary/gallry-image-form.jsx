import React from "react";
import CreateUpdateForm from "../shared/forms/create-update-form";
import {
  useCreateGallaryImageMutation,
  useGetSingleGallaryImageQuery,
  useUpdateGallaryImageMutation,
} from "../../api/gallary-images";
import { useParams } from "react-router-dom";

const formfields = [
  {
    fieldName: "img_src",
    label: "image source",
    placeholder: "Please enter image URL",
  },
];

const GallaryImageForm = () => {
  const { id } = useParams();
  const [createGallaryImage] = useCreateGallaryImageMutation();
  const [updateGallaryImage] = useUpdateGallaryImageMutation();
  const { data } = useGetSingleGallaryImageQuery(id);
  const callback = id ? updateGallaryImage : createGallaryImage;

  return (
    <CreateUpdateForm
      title="add gallary image"
      formfields={formfields}
      callback={callback}
      defaultValues={data?.gallary_image}
      alertText="image added"
    />
  );
};

export default GallaryImageForm;
