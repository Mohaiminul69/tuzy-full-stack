import DeletePage from "../shared/delete-page";
import {
  useDeletePackageMutation,
  useGetAllPackagesQuery,
} from "../../api/packages";

const DeletePackage = () => (
  <DeletePage
    getCollectionCallback={useGetAllPackagesQuery}
    deleteCallBack={useDeletePackageMutation}
    title="Manage Packages"
    type="package"
    alertText="Package deleted"
    confirmTitle="Delete Package"
  />
);

export default DeletePackage;
