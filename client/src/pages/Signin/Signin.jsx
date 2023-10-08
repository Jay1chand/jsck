import styles from "./Signin.module.scss";

// REACT IMPORTS
import { useState } from "react";

// REACT ROUTER
import { useNavigate } from "react-router-dom";

import { Input, Button } from "./../../components";
import { images } from "../../constant";

// TOAST
import { toast } from "react-toastify";

// REACT REDUX
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/userSlice";

// API
import useUser from "./../../api/useUser";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginUser, loading } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    loginUser(formData, (responseData) => {
      console.log("responseData-->", responseData);
      if (responseData?.data?.user) {
        dispatch(setUser(responseData.data.user));
        navigate("/");
      } else {
        toast.error(responseData?.data?.message);
      }
    });
  };

  return (
    <div className={styles.signin}>
      <div className={styles.left}>
        <img src={images.picstone} alt="" className={styles.logo} />
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            placeholder="Email"
            label={"Email"}
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            label={"Password"}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <Button
            buttonText={loading ? "Loading..." : "Sign In"}
            type={"submit"}
          />
        </form>

        <p className={styles.link}>
          {`Don't have an account?`}
          <span
            onClick={() => {
              setFormData({
                ...formData,
                email: "",
                password: "",
              });

              navigate("/signup");
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
      <div className={styles.image}>
        <img src={images.story} alt="story" />
      </div>
    </div>
  );
};

export default Signin;