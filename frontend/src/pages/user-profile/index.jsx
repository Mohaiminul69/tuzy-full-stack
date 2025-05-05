import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserInfoMutation,
} from "../../api/users";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import toastStyle from "../../utils/taost-style";
import "./user-profile.css";

const formfields = [
  {
    fieldName: "first_name",
    label: "first name",
    placeholder: "Please enter first name",
  },
  {
    fieldName: "last_name",
    label: "last name",
    placeholder: "Please enter last name",
  },
  {
    fieldName: "email",
    label: "email",
    placeholder: "Please enter user email",
  },
  {
    fieldName: "date_of_birth",
    label: "date of birth",
    placeholder: "Please enter your date of birth",
  },
  {
    fieldName: "img_src",
    label: "profile pic",
    placeholder: "Please enter profile pic URL",
  },
];

const UserProfile = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const { data, isFetching } = useGetCurrentUserQuery();
  const currentUser = data?.user || user;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [updateCurrentUser] = useUpdateCurrentUserInfoMutation();

  const onSubmit = (data) => {
    let formdata = new FormData();
    formfields.forEach(({ fieldName }) => {
      formdata.append(fieldName, data[fieldName]);
    });
    updateCurrentUser({ payload: formdata })
      .unwrap()
      .then(() => {
        reset();
        toast.success("Profile updated successfully", toastStyle);
      })
      .catch((err) => console.error(err));
  };

  if (isFetching || !currentUser) {
    return (
      <div className="py-5">
        <Container className="text-center">
          <Spinner animation="border" variant="danger" />;
        </Container>
      </div>
    );
  }

  const getUserAttributes = (formView) => {
    return formfields.map(({ fieldName, label }) => (
      <div className="flex flex-col gap-2 col-span-3 md:col-span-2 lg:col-span-1">
        <span className="font-medium capitalize">{label}</span>
        {formView ? (
          <input
            {...register(fieldName, { required: true })}
            placeholder="Enter first name"
            defaultValue={currentUser[fieldName]}
            className={`w-9/10 border-b border-gray-700 focus:border-white focus:outline-none transition-all duration-200 ${
              errors[fieldName] ? "is-invalid ring-3 ring-red-500" : ""
            }`}
          />
        ) : (
          <span className="text-gray-400 border-b border-transparent w-9/10 text-ellipsis overflow-hidden whitespace-nowrap">
            {currentUser[fieldName]}
          </span>
        )}
      </div>
    ));
  };

  return (
    <div className="user-view-page">
      <Container className="mt-5">
        <Row>
          <Col sm={12} md={12} lg={3} className="mb-3">
            <div className="bg-black/70 flex items-center justify-center p-5 rounded-xl h-full">
              <div className="flex flex-col items-center text-center">
                <img
                  src={currentUser.img_src}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 mb-4"
                />
                <h2 className="text-2xl font-bold text-white">
                  {currentUser.first_name} {currentUser.last_name}
                </h2>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} lg={9} className="mb-3">
            <div className="user-details-card">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold mb-5">User Details</h2>
                <button
                  className="btn btn-danger btn-sm !bg-cyan-700 hover:!bg-cyan-800 !px-2 !border-gray-900 !capitalize"
                  onClick={() => setShowForm(!showForm)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <input
                  hidden={true}
                  {...register("user_id")}
                  defaultValue={currentUser.id}
                />
                <div className="grid grid-cols-3 space-y-12">
                  {showForm ? (
                    <>
                      {getUserAttributes(true)}
                      <div className="flex gap-3 w-full items-start mt-4">
                        <button
                          type="submit"
                          className="btn btn-danger btn-sm !font-bold !bg-cyan-800 hover:!bg-cyan-900 !px-2 !border-gray-900 !capitalize"
                        >
                          update
                        </button>
                        <button
                          className="btn btn-danger btn-sm !font-bold !bg-[#a93939] hover:!bg-[#a93939]/80 !px-2 !border-gray-900 !capitalize"
                          onClick={() => setShowForm(false)}
                        >
                          cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {getUserAttributes(false)}
                      <div className="flex flex-col gap-2 col-span-3 md:col-span-2 lg:col-span-1">
                        <span className="font-medium">Admin</span>
                        <span
                          className={`font-bold ${
                            currentUser?.admin
                              ? "text-cyan-700"
                              : "text-[#a93939]"
                          }`}
                        >
                          {currentUser?.admin ? "Yes" : "No"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfile;
