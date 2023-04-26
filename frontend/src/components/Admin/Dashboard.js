import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import { getAdminProducts } from "../../actions/productActions";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts(products));
  }, [dispatch]);

  let outOfStock = 0;
  for (const product of products) {
    if (product.stock === 0) {
      outOfStock++;
    }
  }

  return (
    <Fragment>
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div class="col-12 col-md-10">
        <h1 class="my-4">Dashboard</h1>
        <div class="row pr-4">
          <div class="col-xl-12 col-sm-12 mb-3">
            <div class="card text-white bg-primary o-hidden h-100">
              <div class="card-body">
                <div class="text-center card-font-size">
                  Total Amount
                  <br /> <b>$4567</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row pr-4">
          <div class="col-xl-3 col-sm-6 mb-3">
            <div class="card text-white bg-success o-hidden h-100">
              <div class="card-body">
                <div class="text-center card-font-size">
                  Products
                  <br /> <b>{products && products.length}</b>
                </div>
              </div>
              <a
                class="card-footer text-white clearfix small z-1"
                to="/admin/products"
              >
                <span class="float-left">View Details</span>
                <span class="float-right">
                  <i class="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>

          <div class="col-xl-3 col-sm-6 mb-3">
            <div class="card text-white bg-danger o-hidden h-100">
              <div class="card-body">
                <div class="text-center card-font-size">
                  Orders
                  <br /> <b>125</b>
                </div>
              </div>
              <a
                class="card-footer text-white clearfix small z-1"
                to="/admin/orders"
              >
                <span class="float-left">View Details</span>
                <span class="float-right">
                  <i class="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>

          <div class="col-xl-3 col-sm-6 mb-3">
            <div class="card text-white bg-info o-hidden h-100">
              <div class="card-body">
                <div class="text-center card-font-size">
                  Users
                  <br /> <b>45</b>
                </div>
              </div>
              <Link
                class="card-footer text-white clearfix small z-1"
                to="/admin/users"
              >
                <span class="float-left">View Details</span>
                <span class="float-right">
                  <i class="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div class="col-xl-3 col-sm-6 mb-3">
            <div class="card text-white bg-warning o-hidden h-100">
              <div class="card-body">
                <div class="text-center card-font-size">
                  Out of Stock
                  <br /> <b>{outOfStock}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
