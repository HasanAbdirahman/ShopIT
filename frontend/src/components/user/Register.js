import { Fragment, useEffect, useState } from "react";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearErrors } from "../../actions/userActions";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(
    "https://raw.githubusercontent.com/ghulamabbas2/shopit/master/frontend/public/images/default_avatar.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error]);

  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(registerUser(formData));
  }
  function handleChange(e) {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        // reader.result === -0 means no file when it is 1 means processing and when it is 2 means successful

        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  }

  return (
    <Fragment>
      loading ? <Loader /> :(
      <Fragment>
        <MetaData title={"Register User"} />
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form
              className="shadow-lg"
              encType="multipart/form-data"
              onSubmit={submitHandler}
            >
              <h1 className="mb-3">Register</h1>

              <div className="form-group">
                <label htmlFor="email_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="images/*"
                      onChange={handleChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>

              <button
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </Fragment>
      )
    </Fragment>
  );
}
