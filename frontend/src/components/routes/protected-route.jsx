import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetCurrentUserQuery } from "../../api/users";
import { Container, Spinner } from "react-bootstrap";
import Header from "../navbar";
import Footer from "../footer";
import Sidenav from "../sidenav";

const ProtectedRoute = ({ isDashboard, isAdminOnly }) => {
  const { user } = useAuth();
  const { data, isFetching } = useGetCurrentUserQuery();
  const currentUser = data?.user || user;
  const location = useLocation();

  if (isFetching && !user) {
    return (
      <div className="bg-my-bookings py-5">
        <Container className="text-center">
          <Spinner animation="border" variant="danger" />;
        </Container>
      </div>
    );
  }

  if (!currentUser?.email) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return isAdminOnly && !currentUser.admin ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <>
      <Header currentUser={currentUser} isDashboard={isDashboard} />
      {isDashboard && <Sidenav currentUser={currentUser} />}
      <Outlet />
      <Footer />
    </>
  );
};

export default ProtectedRoute;
