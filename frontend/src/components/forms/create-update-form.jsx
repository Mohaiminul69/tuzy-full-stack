import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalAlert from "../modals/alert-modal";
import "./form.css";

const CreateUpdateForm = ({
  title,
  subtitle,
  showManageButton,
  formfields,
  callback,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const action = id ? "edit" : "add";
  const alertStatus = id ? "updated" : "created";
  const formTitle = `${action} ${title}`;
  const formSubtitle = `${subtitle} ${action} ${title}`;
  const navigate = useNavigate();
  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const closeAlert = () => {
    setShowAlert(false);
    navigate("/");
  };

  const handleAlert = () => setShowAlert(true);

  const onSubmit = (data) => {
    const formdata = new FormData();

    formfields.forEach(({ fieldName }) => {
      formdata.append(fieldName, data[fieldName]);
    });

    const formDataObj = { payload: formdata };
    if (id) formDataObj.id = id;

    callback(formDataObj)
      .unwrap()
      .then(() => {
        setAlertText(`${title} ${alertStatus}`);
        handleAlert();
        reset();
      });
  };

  // if (false) return "Hello Loader";

  return (
    <div className="bgAddTour py-5">
      <h1 className="display-3 mt-5 capitalize">{formTitle}</h1>
      <Container className="mt-2">
        <Row>
          <Col sm={12} md={3}>
            {showManageButton && (
              <Link to="/deleteTour">
                <button className="btn btn-danger">Manage All Tours</button>
              </Link>
            )}
          </Col>
          <Col sm={12} md={6}>
            <form onSubmit={handleSubmit(onSubmit)} className="AddTourForm">
              <h6 className="fw-light fs-5 mb-4">{formSubtitle}</h6>
              {formfields.map(({ fieldName, placeholder, label }) => (
                <div className="mb-3 w-full" key={fieldName}>
                  <label htmlFor={fieldName} className="form-label capitalize">
                    {label}*
                  </label>
                  <input
                    defaultValue={defaultValues?.[fieldName]}
                    {...register(fieldName, { required: id ? false : true })}
                    placeholder={placeholder}
                    className={`form-control ${
                      errors[fieldName] ? "is-invalid ring-3 ring-red-500" : ""
                    }`}
                  />
                </div>
              ))}
              <div className="flex gap-4 w-full items-start mt-3">
                <button
                  type="submit"
                  className="py-2 rounded-3 px-5 bg-teal-800 font-bold !capitalize"
                >
                  {formTitle}
                </button>
                <button
                  type="submit"
                  className="py-2 rounded-3 px-5 bg-danger font-bold !capitalize"
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
      <ModalAlert
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
