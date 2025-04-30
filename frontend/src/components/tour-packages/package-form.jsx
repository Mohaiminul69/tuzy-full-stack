import React from "react";
import { useCreatePackageMutation } from "../../api/packages";
import CreateUpdateForm from "../shared/forms/create-update-form";
import { useParams } from "react-router-dom";

const formfields = [
  {
    fieldName: "name",
    label: "name",
    placeholder: "Please enter image URL",
  },
  {
    fieldName: "price",
    label: "price",
    placeholder: "Please enter image URL",
  },
  {
    fieldName: "description",
    label: "description",
    placeholder: "Please enter image URL",
  },
  {
    fieldName: "img_src",
    label: "image source",
    placeholder: "Please enter image URL",
  },
];

const PackageForm = () => {
  const [createPackage] = useCreatePackageMutation();
  const { id } = useParams();
  const alertText = id ? "package updated" : "package added";
  const title = id ? "update package" : "add package";

  return (
    <CreateUpdateForm
      title={title}
      formfields={formfields}
      callback={createPackage}
      alertText={alertText}
    />
  );
};

export default PackageForm;
