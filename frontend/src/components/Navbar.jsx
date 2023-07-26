import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

function Navbar() {
  const { userInfo } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  // Handlers
  async function logoutHandler() {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  console.log(userInfo);
  return (
    <header className="w-full h-16 bg-brand-700 text-white flex items-center justify-around">
      <div className="text-xl">Social Media</div>
      <nav>
        <ul className="flex gap-5">
          <NavLink to="/">Home</NavLink>
          {userInfo ? (
            <>
              <NavLink onClick={logoutHandler}>Log Out</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/signup">Register</NavLink>
              <NavLink to="/login">Login In</NavLink>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

function NavLink({ children, ...props }) {
  return (
    <li className="">
      <Link className="hover:text-gray-100" {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
