// import { Fragment, useEffect, useState } from "react";
// import Loader from "../layouts/Loader";
// import MetaData from "../layouts/MetaData";
// import { useNavigate } from "react-router-dom";

// import { useAlert } from "react-alert";
// import { useDispatch, useSelector } from "react";
// import { register, clearErrors } from "../../actions/userActions";

// export default function Register() {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const { name, email, password } = user;
//   const [avatar, setAvatar] = useState("");

//   const [avatarPreview, setAvatarPreview] = useState('/images/');

//   const alert = useAlert();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isAuthenticated, error, loading } = useSelector(
//     (state) => state.user
//   );

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/");
//     }
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, alert, isAuthenticated, error]);
//   return (
//     <Fragment>
//       loading ? <Loader /> :(
//       <Fragment>
//         <MetaData title="Sign up" />
//       </Fragment>
//       )
//     </Fragment>
//   );
// }
