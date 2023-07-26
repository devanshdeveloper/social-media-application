import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputFields";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Alert from "../components/Alert";

function LoginScreen() {
  // Hooks
  const [alert, setAlert] = useState({ text: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { loading }] = useLoginMutation();
  const { userInfo } = useSelector((s) => s.auth);

  // useEffect
  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate("/");
    } catch (err) {
      setAlert({text : err.data.error})
    }
  }

  return (
    <>
      <div className="bg-brand-200 h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="w-[min(400px,90vw)] bg-white rounded p-10">
          <form
            className="flex flex-col items-center space-y-5"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl ">Login</h1>
            <InputField type="email" name="email" placeholder="Email" />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
            />
            <button className="btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
      <Alert {...alert} {...{ setAlert }} />
    </>
  );
}

export default LoginScreen;
