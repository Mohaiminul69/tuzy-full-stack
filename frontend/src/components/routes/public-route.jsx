import { Outlet } from "react-router-dom";
import Header from "../navbar";
import Footer from "../footer";
import useAuth from "../../hooks/useAuth";
import { useGetCurrentUserQuery } from "../../api/users";
import { useEffect } from "react";

const PublicRoute = () => {
  const { user, isLoggedIn } = useAuth();
  const { data, refetch } = useGetCurrentUserQuery(undefined, {
    skip: !isLoggedIn,
  });

  const currentUser = data?.user || user;

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn, refetch]);

  return (
    <>
      <Header currentUser={currentUser} />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoute;
