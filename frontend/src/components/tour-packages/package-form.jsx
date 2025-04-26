import React from "react";
import { useCreatePackageMutation } from "../../api/packages";
import CreateUpdateForm from "../shared/forms/create-update-form";

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

  return (
    <CreateUpdateForm
      title="package"
      formfields={formfields}
      callback={createPackage}
    />
  );
};

export default PackageForm;
