import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import ModalAlert from "../modals/alert-modal";
import {
  useCreateDestinationMutation,
  useGetSingleDestinationQuery,
  useUpdateDestinationMutation,
} from "../../api";
import "./destination-form.css";

const DestinationForm = () => {
  // Alert Modal
  // Alert Modal
  const { id } = useParams();
  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => setShowAlert(false);
  const handleAlert = () => setShowAlert(true);
  const [createDestination] = useCreateDestinationMutation();
  const [updateDestination] = useUpdateDestinationMutation();
  const { data = {}, isFetching } = useGetSingleDestinationQuery(id, {
    skip: !id,
  });
  const { name, description, short_description, price, img_src } =
    data?.destination || {};
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: data?.destination });
  const callback = id ? updateDestination : createDestination;

  const onSubmit = (data) => {
    const formdata = new FormData();

    formdata.append("name", data?.name);
    formdata.append("description", data?.description);
    formdata.append("short_description", data?.short_description);
    formdata.append("price", data?.price);
    formdata.append("img_src", data?.img_src);

    const formDataObj = { payload: formdata };
    if (id) formDataObj.id = id;

    callback(formDataObj)
      .unwrap()
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setAlertText("Tour Created");
          handleAlert();
          reset();
        }
      });
  };

  if (isFetching) return "Hello Loader";

  return (
    <div className="bgAddTour py-5">
      <h1 className="display-2 mt-5">Add Tour</h1>
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
                Please fill up the form to Add Tour
              </h6>
              <input
                defaultValue={name}
                {...register("name", { required: true })}
                placeholder="Tour/Package Name"
                className="form-control mb-3"
              />
              {/* <select {...register("type")} className="form-control mb-3">
                <option value="tour">Tour</option>
                <option value="package">Package</option>
              </select> */}
              <input
                defaultValue={price}
                {...register("price", { required: true })}
                placeholder="Tour/Package Price"
                className="form-control mb-3"
                type="number"
              />
              <input
                defaultValue={short_description}
                {...register("short_description", { required: true })}
                placeholder="Short Description"
                className="form-control mb-3"
              />
              <input
                defaultValue={description}
                {...register("description", { required: true })}
                placeholder="Description"
                className="form-control mb-3"
              />
              <input
                defaultValue={img_src}
                {...register("img_src", { required: true })}
                placeholder="Tour/Package Image URL"
                className="form-control mb-3"
              />
              {errors.exampleRequired && <span>This field is required</span>}
              <button type="submit" className="btn btn-danger">
                Add Tour
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

export default DestinationForm;
