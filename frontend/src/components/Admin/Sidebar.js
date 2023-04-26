import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>
          {/* data-toggle="collapse" and aria-expanded="false" they way they put it mean the li below with the link
  will contain a sub-content that will be identified  */}
          <li>
            <Link
              to="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fab fa-product-hunt"></i> Products
            </Link>
            <ul className="collapse list-unstyled" id="productSubmenu">
              <li>
                <Link to="/admin/products">
                  <i className="fa fa-clipboard-list"></i> All
                </Link>
              </li>

              <li>
                <Link to="/admin/product">
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>
          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-users"></i> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
