import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import AlertModal from "../modals/alert-modal";
import useAuth from "../../../hooks/useAuth";
import "./form.css";

const CreateUpdateForm = (props) => {
  const { title, formfields, callback, defaultValues, alertText } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const { id } = useParams();
  const formSubtitle = `Please fill up the form to ${title}`;
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const { login } = useAuth();

  const closeAlert = () => {
    setShowAlert(false);
    navigate("/");
  };

  const onSubmit = (data) => {
    const formdata = new FormData();

    formfields.forEach(({ fieldName }) => {
      formdata.append(fieldName, data[fieldName]);
    });

    const formDataObj = { payload: formdata };
    if (id) formDataObj.id = id;

    callback(formDataObj)
      .unwrap()
      .then((data) => {
        if (data?.token) {
          login(data.user, data.token);
        }
        setShowAlert(true);
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-form py-5 bg-black h-screen">
      <h1 className="display-3 mt-5 capitalize">{title}</h1>
      <Container className="mt-2">
        <Row>
          <Col sm={12} md={3}></Col>
          <Col sm={12} md={6}>
            <form onSubmit={handleSubmit(onSubmit)} className="add-tour-form">
              <h6 className="fw-light fs-5 mb-4">{formSubtitle}</h6>
              {formfields.map(({ fieldName, placeholder, label, hidden }) =>
                hidden ? (
                  <input
                    hidden={hidden}
                    {...register(fieldName, { required: id ? false : true })}
                  />
                ) : (
                  <div className="mb-3 w-full" key={fieldName}>
                    <label
                      htmlFor={fieldName}
                      className="form-label capitalize"
                    >
                      {label}*
                    </label>
                    <input
                      hidden={hidden}
                      {...register(fieldName, { required: id ? false : true })}
                      placeholder={placeholder}
                      className={`form-control ${
                        errors[fieldName]
                          ? "is-invalid ring-3 ring-red-500"
                          : ""
                      }`}
                    />
                  </div>
                )
              )}
              <div className="flex gap-3 w-full items-start mt-3">
                <button
                  type="submit"
                  className="btn btn-danger btn-sm !font-bold !bg-cyan-800 hover:!bg-cyan-900 !py-2 !px-4 !border-gray-900 !capitalize !rounded-lg"
                >
                  {title}
                </button>
                <button
                  className="btn btn-danger btn-sm !font-bold !bg-[#a93939] hover:!bg-[#a93939]/80 !py-2 !px-4 !border-gray-900 !capitalize !rounded-lg"
                  onClick={() => navigate("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          </Col>
          <Col sm={12} md={3}></Col>
        </Row>
      </Container>
      <AlertModal
        showAlert={showAlert}
        closeAlert={closeAlert}
        alertText={alertText}
      />
    </div>
  );
};

CreateUpdateForm.defaultProps = {
  showManageButton: false,
};

CreateUpdateForm.propTypes = {
  showManageButton: PropTypes.bool,
};

export default CreateUpdateForm;
