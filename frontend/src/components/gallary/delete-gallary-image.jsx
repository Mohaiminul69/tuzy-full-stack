import React from "react";
import DeletePage from "../shared/delete-page";
import {
  useDeleteGallaryImageMutation,
  useGetAllGallaryImagesQuery,
} from "../../api/gallary-images";

const DeleteGallaryImage = () => (
  <DeletePage
    getCollectionCallback={useGetAllGallaryImagesQuery}
    deleteCallBack={useDeleteGallaryImageMutation}
    title="Manage Gallary Images"
    type="gallary-image"
    alertText="Gallary Image deleted"
    confirmTitle="Delete Gallary Image"
  />
);

export default DeleteGallaryImage;
