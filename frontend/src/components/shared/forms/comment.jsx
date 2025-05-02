import React from "react";
import { useGetSingleUserQuery } from "../../../api/users";

const Comment = ({ review }) => {
  const { data } = useGetSingleUserQuery(review?.user_id);
  const user = data?.user || {};

  return (
    <div className="flex gap-3 items-center border-b border-gray-700 pb-3 w-9/10 last:border-0">
      {user?.img_src && (
        <img
          className="border-3 border-white !w-[45px] !h-[45px] !rounded-full"
          src={user?.img_src}
          alt=""
        />
      )}
      <div className="flex flex-col gap-.5">
        <span className="text-gray-400 capitalize">
          {user.first_name} {user.last_name}
        </span>
        <span>{review.comment}</span>
      </div>
    </div>
  );
};

export default Comment;
