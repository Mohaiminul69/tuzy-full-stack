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
  const { data = {} } = useGetSingleGallaryImageQuery(id, {
    skip: !id,
  });
  const callback = id ? updateGallaryImage : createGallaryImage;
  const title = id ? "update gallary image" : "add gallary image";
  const alertText = id ? "gallary image updated" : "gallary image added";

  return (
    <CreateUpdateForm
      title={title}
      formfields={formfields}
      callback={callback}
      defaultValues={data?.gallary_image}
      alertText={alertText}
    />
  );
};

export default GallaryImageForm;
