// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadUser } from "../../actions/userActions";

// const ProtectedRoute = ({ children, isAdmin, history }) => {
//   const dispatch = useDispatch();
//   const {
//     isAuthenticated = false,
//     loading = true,
//     user,
//   } = useSelector((state) => state.user);
//   useEffect(() => {
//     if (!user) {
//       dispatch(loadUser());
//     }
//   }, [isAuthenticated, user, dispatch, loading]);

//   if (loading) return <h1>loading...</h1>;

//   if (!loading && isAuthenticated) {
//     if (isAdmin === true && user.role !== "admin") {
//       return history("/");
//     }
//     return children;
//   } else {
//     return <history({"/login"}) />;
//   }
// };

// export default ProtectedRoute;

import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
