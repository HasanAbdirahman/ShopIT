import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";

const NewProduct = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    dispatch(newProduct());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");
      alert.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, success, navigate, error]);

  function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", productDetail.name);
    formData.set("price", productDetail.price);
    formData.set("description", productDetail.description);
    formData.set("category", productDetail.category);
    formData.set("stock", productDetail.stock);
    formData.set("seller", productDetail.seller);

    productDetail.images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(formData));
  }
  function handleChange(e) {
    const files = Array.from(e.target.files);

    setProductDetail.images = [];
    setProductDetail.imagesPreview = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // reader.result === -0 means no file when it is 1 means processing and when it is 2 means successful
        if (reader.readyState === 2) {
          setProductDetail.imagesPreview((oldArray) => [
            ...oldArray,
            reader.result,
          ]);
          setProductDetail.images((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <Fragment>
      <MetaData title={"All Products => Admin"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
      </div>

      <div class="wrapper my-5">
        <form
          class="shadow-lg"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <h1 class="mb-4">New Product</h1>

          <div class="form-group">
            <label for="name_field">Name</label>
            <input
              type="text"
              id="name_field"
              class="form-control"
              value={productDetail.name}
              onChange={(e) => setProductDetail.name(e.target.name)}
            />
          </div>

          <div class="form-group">
            <label for="price_field">Price</label>
            <input
              type="text"
              id="price_field"
              class="form-control"
              value={productDetail.price}
              onChange={(e) => setProductDetail.price(e.target.price)}
            />
          </div>

          <div class="form-group">
            <label for="description_field">Description</label>
            <textarea
              class="form-control"
              id="description_field"
              rows="8"
              value={productDetail.description}
              onChange={(e) =>
                setProductDetail.description(e.target.description)
              }
            ></textarea>
          </div>

          <div class="form-group">
            <label for="category_field">Category</label>
            <select class="form-control" id="category_field">
              {categories.map((category) => {
                <option key={category}>{category}</option>;
              })}
            </select>
          </div>
          <div class="form-group">
            <label for="stock_field">Stock</label>
            <input
              type="number"
              id="stock_field"
              class="form-control"
              value={productDetail.stock}
              onChange={(e) => setProductDetail.stock(e.target.stock)}
            />
          </div>

          <div class="form-group">
            <label for="seller_field">Seller Name</label>
            <input
              type="text"
              id="seller_field"
              class="form-control"
              value={productDetail.seller}
              onChange={(e) => setProductDetail.seller(e.target.seller)}
            />
          </div>

          <div class="form-group">
            <label>Images</label>

            <div class="custom-file">
              <input
                type="file"
                name="product_images"
                class="custom-file-input"
                id="customFile"
                value={productDetail.images}
                onChange={handleChange}
                multiple
              />
              <label class="custom-file-label" for="customFile">
                Choose Images
              </label>
            </div>
          </div>
          {productDetail.imagesPreview.map((image) => {
            <img
              classNmae="mr-2 mt-3"
              width="55"
              height="52"
              src={image}
              alt={productDetail.imagePreview}
            />;
          })}

          <button
            id="login_button"
            type="submit"
            class="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            CREATE
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewProduct;
