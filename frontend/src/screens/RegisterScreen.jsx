import { useState } from "react";
import { InputField } from "../components/InputFields";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";

export default function RegisterScreen() {
  // Hooks
  const [alert, setAlert] = useState({ text: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { loading }] = useRegisterMutation();
  const { userInfo } = useSelector((s) => s.auth);

  // useEffect
  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await register({ name,email, password }).unwrap();
      // dispatch();
      navigate("/");
    } catch (err) {
      setAlert({ text: err.data.error });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
  }

  return (
    <div className="bg-brand-200 h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="w-[min(400px,90vw)] bg-white rounded p-10">
        <form
          className="flex flex-col items-center space-y-5"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl ">Sign Up</h1>
          <InputField type="text" name="name" placeholder="Name" />
          <InputField type="email" name="email" placeholder="Email" />
          <InputField type="password" name="password" placeholder="Password" />
          <button className="btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
