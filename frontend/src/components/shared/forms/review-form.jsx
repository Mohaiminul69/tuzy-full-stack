import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCreateReviewMutation } from "../../../api/reviews";

const ReviewForm = ({ tourType }) => {
  const [showButtons, setShowButtons] = useState(false);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createReview] = useCreateReviewMutation();

  const onSubmit = (data) => {
    const formdata = new FormData();
    formdata.append("rating", 3);
    formdata.append("comment", data?.comment);
    formdata.append(`${tourType}_id`, id);

    createReview({ payload: formdata })
      .unwrap()
      .then(() => {
        reset();
        setShowButtons(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <input hidden={true} {...register(`${tourType}_id`)} defaultValue={id} />
      <input
        {...register("comment", { required: true })}
        placeholder="Add a comment"
        onFocus={() => setShowButtons(true)}
        className={`w-9/10 border-b border-gray-700 focus:border-white focus:outline-none transition-all duration-200 py-2 ${
          errors["comment"] ? "is-invalid ring-3 ring-red-500" : ""
        }`}
      />
      <div
        className={`flex gap-2 w-full items-start mt-3 transform transition-all duration-300 ${
          showButtons
            ? "opacity-100 max-h-40 scale-100"
            : "opacity-0 max-h-0 scale-95 pointer-events-none"
        }`}
      >
        <button
          className="btn btn-danger btn-sm !font-bold !bg-cyan-700 hover:!bg-cyan-800 !px-2 !border-gray-900 !capitalize"
          type="submit"
        >
          comment
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm !font-bold !bg-[#a93939] hover:!bg-[#a93939]/80 !px-2 !border-gray-900 !capitalize"
          onClick={() => setShowButtons(false)}
        >
          cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
