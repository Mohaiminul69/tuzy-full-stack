import React from "react";
import CreateUpdateForm from "../forms/create-update-form";
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
      title="gallary image"
      subtitle="Please fill up the form to "
      formfields={formfields}
      callback={callback}
      defaultValues={data?.gallary_image}
    />
  );
};

export default GallaryImageForm;
