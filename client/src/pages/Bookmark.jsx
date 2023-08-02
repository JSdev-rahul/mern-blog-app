import { uniqBy } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { BsBookmarkDashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { lottiee2 } from "../assets";
import ButtonHeader from "../component/ButtonHeader";
import ScrollToTop from "../component/ScrollToTop";
import { bookmarkAsyncThunk } from "../redux/asyncThunk/bookmark.asyncThunk";
import { myPostReducer } from "../redux/slices/myPostSlice";
import { pageDataReducer } from "../redux/slices/pageData.slice";
import { removePosts } from "../redux/slices/post.slice";
import { LottieAnimation } from "../utils/LottieHandler";
import Swal from "sweetalert2";
import { filterBookmarkPost } from "../redux/slices/bookmark.slice";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BookmarkPage = () => {
  const { myPost } = useSelector((state) => state?.myPostSlice);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);

  const { pageData } = useSelector((state) => state?.pageDataSlice);
  const { bookmarkPosts, totalPages } = useSelector(
    (state) => state?.bookmarkSlice
  );

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    setPreviousScrollPosition(scrollPosition);
  }, []);
  const dispatch = useDispatch();
  const [allPostList, setAllPostList] = useState([]);

  // useEffect(() => {
  //   const data=[...allPostList,...bookmarkPosts]
  //   const uniqueObject = uniqBy(data, (obj) => obj._id);
  //   setAllPostList(uniqueObject);
  // }, [bookmarkPosts]);

  const fetchBookmarkPost = () => {
    setIsLoading(true);
    dispatch(bookmarkAsyncThunk.getBookMarkPost(pageData))
      .unwrap()
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    fetchBookmarkPost();
  }, [pageData, dispatch]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    } else {
      if (pageData.page < totalPages) {
        const nextPage = pageData.page + 1;
        dispatch(pageDataReducer({ page: nextPage }));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const handleNavigateToDetailsPage = (id) => {
    sessionStorage.setItem("scrollPosition", window.pageYOffset);
    navigate(`/${id}`);
  };

  const handlePostView = (status) => {
    setAllPostList([]);
    dispatch(removePosts());
    dispatch(pageDataReducer({ page: 1 }));
    dispatch(myPostReducer(status));
  };

  const removeFromBookmark = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(bookmarkAsyncThunk.deleteFromBookmakAsyncThunk({ id }))
          .unwrap()
          .then((res) => {
            Swal.fire(
              "remove!",
              "Your file has been remove from bookmark.",
              "success"
            );
            dispatch(filterBookmarkPost(id));
            fetchBookmarkPost();
          })
          .catch((err) => {
            console.log("something went wrong");
          });
      }
    });
  };

  return (
    <>
      <ButtonHeader handlePostView={handlePostView} myPost={myPost} />
      <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 md:grid-cols-3">
        <ScrollToTop previousScrollPosition={previousScrollPosition} />
        {bookmarkPosts?.length == 0 ? (
          <LottieAnimation file={lottiee2} />
        ) : (
          bookmarkPosts?.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <div className="block">
                <div
                  className="cursor-pointer"
                  onClick={() => handleNavigateToDetailsPage(item?.postId?._id)}
                >
                  <div className="relative h-48">
                    <LazyLoadImage
                      src={`${import.meta.env.VITE_API_URL}/${item?.postId?.cover}`}
                      alt={item.title}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <h1 className="text-xl font-bold text-black">
                        {item?.postId?.title}
                      </h1>
                    </div>
                    <p className="text-gray-600 mb-4  ">
                      {item?.postId?.shortDescription?.slice(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-5">
                      {item?.postId?.categories?.map((item) => {
                        return (
                          <span
                            key={item?._id}
                            className="border text-sm text-black rounded-full px-4 bg-gray-100"
                          >
                            {item?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="border-t mb-4"></div>
                <div className="flex gap-4  justify-between mb-4 ml-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12">
                      <LazyLoadImage
                        className="object-cover w-12 h-12 rounded-full"
                        src="https://media.istockphoto.com/id/882115168/photo/portrait-of-a-gloomy-young-man-in-a-dark-background.jpg?s=1024x1024&w=is&k=20&c=SW0MmcwwlSte8COFJeQ_26G0l6dVCqPJ1n-WK6czO6A="
                        alt="Author"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="text-1xl font-medium text-gray-600">
                          {item?.postId?.author?.name}
                        </span>
                        <div>
                          <h1 className="text-green-700">Follow</h1>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <BiTimeFive className="text-gray-500 mr-1" />
                        <span className="text-sm text-gray-500">
                          {moment(item?.postId?.createdAt).format(
                            "MMM Do YY h:mm A"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex text-2xl mr-8 items-center cursor-pointer text-black gap-2 ">
                    <span className="">
                      <BsBookmarkDashFill
                        onClick={() => removeFromBookmark(item?._id)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default BookmarkPage;
