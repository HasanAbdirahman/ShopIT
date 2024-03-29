import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";

export default function OrderSuccess() {
  return (
    <Fragment>
      <MetaData title={"Order Success"} />
      <div class="container container-fluid">
        <div class="row justify-content-center">
          <div class="col-6 mt-5 text-center">
            <img
              class="my-5 img-fluid d-block mx-auto"
              src="https://raw.githubusercontent.com/ghulamabbas2/shopit/master/frontend/public/images/order_success.png"
              alt="Order Success"
              width="200"
              height="200"
            />

            <h2>Your Order has been placed successfully.</h2>

            <Link to="/order/me">Go to Orders</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
