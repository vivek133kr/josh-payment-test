import { useContext, useEffect, useState } from "react";

import { useNavigate, Navigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/dataContext";

export const PrivateLoginRoute = ({ children }) => {
  let { paymentJoshLogin } = useContext(DataContext);
  if (paymentJoshLogin) {
    return <Navigate to={`/`} />;
  }
  return children;
};
