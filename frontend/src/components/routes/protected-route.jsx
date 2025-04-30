import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetCurrentUserQuery } from "../../api/users";
import { Container, Spinner } from "react-bootstrap";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const { data, isFetching } = useGetCurrentUserQuery();
  const currentUser = data?.user || user;
  const location = useLocation();

  if (isFetching && !user) {
    return (
      <div className="bg-my-orders py-5">
        <Container className="text-center">
          <Spinner animation="border" variant="danger" />;
        </Container>
      </div>
    );
  }

  if (!currentUser?.email) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
