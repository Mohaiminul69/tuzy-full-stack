import React from "react";
import {
  useCreatePackageMutation,
  useGetSinglePackageQuery,
  useUpdatePackageMutation,
} from "../../api/packages";
import CreateUpdateForm from "../shared/forms/create-update-form";
import { useParams } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";

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
    fieldName: "short_description",
    label: "short description",
    placeholder: "Please enter a short description about the package",
  },
  {
    fieldName: "img_src",
    label: "image source",
    placeholder: "Please enter image URL",
  },
];

const PackageForm = () => {
  const [createPackage] = useCreatePackageMutation();
  const [updatePackage] = useUpdatePackageMutation();
  const { id } = useParams();
  const alertText = id ? "package updated" : "package added";
  const title = id ? "update package" : "add package";
  const callback = id ? updatePackage : createPackage;
  const { data = {} } = useGetSinglePackageQuery(id, {
    skip: !id,
  });

  return (
    <CreateUpdateForm
      title={title}
      formfields={formfields}
      callback={callback}
      alertText={alertText}
      defaultValues={data?.package}
    />
  );
};

export default PackageForm;
