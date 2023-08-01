import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { pageDataReducer } from "../redux/slices/pageData.slice";
import { BiBookmark, BiBookOpen, BiEdit } from "react-icons/bi"; // Import the icons from react-icons

const ButtonHeader = ({ myPost, handlePostView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActiveAll = pathname === "/" && !myPost;
  const isActiveMy = pathname === "/" && myPost;
  const isActiveBookmark = pathname === "/my-bookmark-post";

  const handleButtonClick = (key) => {
    if (key === "all") {
      handlePostView(false);
    } else if (key === "my") {
      handlePostView(true);
    } else if (key === "bookmark") {
      navigate("/my-bookmark-post");
      dispatch(pageDataReducer({ page: 1 }));
    }
  };

  const getButtonStyle = (key) => {
    const baseStyle = "border rounded-full px-4 py-2 cursor-pointer";
    const activeStyle = "bg-red-500 text-white";
    const inactiveStyle = "bg-gray-100 text-black";

    if (key === "all") {
      return isActiveAll
        ? baseStyle + " " + activeStyle
        : baseStyle + " " + inactiveStyle;
    } else if (key === "my") {
      return isActiveMy
        ? baseStyle + " " + activeStyle
        : baseStyle + " " + inactiveStyle;
    } else if (key === "bookmark") {
      return isActiveBookmark
        ? baseStyle + " " + activeStyle
        : baseStyle + " " + inactiveStyle;
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center md:flex-row md:items-center md:justify-center gap-4 mt-28 md:mt-24">
      <button
        onClick={() => {
          navigate("/");
          handleButtonClick("all");
        }}
        className={getButtonStyle("all")}
      >
        <div className="flex items-center gap-2">
          <BiBookOpen /> All Blogs
        </div>
      </button>
      <button
        onClick={() => {
          navigate("/");
          handleButtonClick("my");
        }}
        className={getButtonStyle("my")}
      >
        <div className="flex items-center gap-2">
          <BiEdit /> My Blogs
        </div>
      </button>
      <button
        onClick={() => handleButtonClick("bookmark")}
        className={getButtonStyle("bookmark")}
      >
        <div className="flex items-center gap-2">
          <BiBookmark /> My Bookmark
        </div>
      </button>
    </div>
  );
};

export default ButtonHeader;
