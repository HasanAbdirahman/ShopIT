import { Fragment } from "react";
import "../../App.css";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

function Header() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
  };
  const { user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img
                src="https://raw.githubusercontent.com/ghulamabbas2/shopit/master/frontend/public/images/shopit_logo.png"
                alt="logo"
              />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#! "
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropdownMenuwButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/order/me">
                  Orders
                </Link>

                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  to="/"
                  className="dropdown-item text-danger"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;
