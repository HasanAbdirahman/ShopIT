import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, clearErrors } from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";

const UpdatedProduct = () => {
  const alert = useAlert();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = params.id;

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteUpdateProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("The product was updated successfully");
      dispatch(UPDATE_PRODUCT_RESETS);
    }
  }, [alert, dispatch, error, updateError]);

  const [productDetail, setProductDetail] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    seller: "",
    images: [],
    imagesPreview: [],
  });
  return <div></div>;
};

export default UpdatedProduct;
