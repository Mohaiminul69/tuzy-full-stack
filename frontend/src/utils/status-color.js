const getStatusColor = (status) => {
  let statusColor = "text-amber-400";
  if (status === "approved") statusColor = "text-teal-700";
  else if (status === "cancelled") statusColor = "text-[#a93939]";

  return statusColor;
};

export default getStatusColor;
