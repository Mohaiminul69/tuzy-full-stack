import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalAlert from "../../modals/alert-modal";
import {
  useGetSingleDestinationQuery,
  useUpdateDestinationMutation,
} from "../../../api/destinations";
import { useCreateGallaryImageMutation } from "../../../api/gallary-images";
import "../form.css";

const GallaryImageForm = () => {
  // Alert Modal
  // Alert Modal
  const navigate = useNavigate();
  const { id } = useParams();
  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => {
    setShowAlert(false);
    navigate("/");
  };
  const handleAlert = () => setShowAlert(true);
  const [createGallaryImage] = useCreateGallaryImageMutation();
  const [updateDestination] = useUpdateDestinationMutation();
  const { data = {}, isFetching } = useGetSingleDestinationQuery(id, {
    skip: !id,
  });
  const { img_src } = data?.destination || {};
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: data?.destination });
  const callback = id ? updateDestination : createGallaryImage;

  const onSubmit = (data) => {
    const formdata = new FormData();

    formdata.append("img_src", data?.img_src);

    const formDataObj = { payload: formdata };
    if (id) formDataObj.id = id;

    callback(formDataObj)
      .unwrap()
      .then(() => {
        setAlertText("Gallary Image Created");
        handleAlert();
        reset();
      });
  };

  if (isFetching) return "Hello Loader";

  return (
    <div className="bgAddTour py-5">
      <h1 className="display-2 mt-5">Add Gallary Image</h1>
      <Container className="mt-2">
        <Row>
          <Col sm={12} md={3}>
            <Link to="/deleteTour">
              <button className="btn btn-danger">Manage All Tours</button>
            </Link>
          </Col>
          <Col sm={12} md={6}>
            <form onSubmit={handleSubmit(onSubmit)} className="AddTourForm">
              <h6 className="fw-light fs-5 mb-3">
                Please fill up the form to add gallary image
              </h6>
              <input
                defaultValue={img_src}
                {...register("img_src", { required: true })}
                placeholder="Tour/Package Image URL"
                className="form-control mb-3"
              />
              {errors.exampleRequired && <span>This field is required</span>}
              <button type="submit" className="btn btn-danger">
                Add Gallary Image
              </button>
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

export default GallaryImageForm;
