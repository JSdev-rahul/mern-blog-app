import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { BsBookmarks, BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logo1, logo2, logo4 } from "../assets";
import { removeToken } from "../redux/slices/auth.slice";

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md  px-8 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-black">
        <div className="w-24 h-16 flex items-center justify-center">
          <img src={logo1}></img>
        </div>
      </Link>
      {!token ? (
        <nav className="hidden md:flex gap-5">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      ) : (
        <div className="hidden md:flex items-center gap-4">
          <nav>
            <Link
              to={"/create-new-post"}
              className="border py-2 flex items-center gap-1 rounded-full px-4 cursor-pointer"
            >
              <div className="text-sm text-black">
                <BsPencilSquare />
              </div>
              <div className="text-sm text-black">Write</div>
            </Link>
          </nav>
          <div className="text-sm text-black">
            <BsBookmarks />
          </div>
        
          <div
            onClick={() => dispatch(removeToken())}
            className="bg-red-800 p-2 items-center cursor-pointer rounded-full text-white"
          >
            <BiLogOutCircle />
          </div>
        </div>
      )}
      <div className="md:hidden flex items-center gap-4">
        <div className="text-xl text-black cursor-pointer">
          <BsBookmarks />
        </div>
        <nav>
          <Link to={"/create-new-post"}>
            <BsPencilSquare className="text-xl text-black" />
          </Link>
        </nav>
        <div
          onClick={() => dispatch(removeToken())}
          className="bg-red-800 p-2 items-center cursor-pointer rounded-full text-white"
        >
          <BiLogOutCircle />
        </div>
      </div>
    </header>
  );
};

export default Header;
