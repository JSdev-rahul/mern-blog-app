import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { postAsyncThunk } from "../redux/asyncThunk/post.asyncThunk";
import moment from "moment";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import { LottieAnimation } from "../utils/LottieHandler";
import { lottiee2 } from "../assets";
import { myPostReducer } from "../redux/slices/myPostSlice";
import { pageDataReducer } from "../redux/slices/pageData.slice";
import uniqBy from "lodash/uniqBy";
import {
  filterPosts,
  removeFromBookmarkReducer,
  removePosts,
} from "../redux/slices/post.slice";
import LoadingIndicator from "../component/LodingIndigator";
import ScrollToTop from "../component/ScrollToTop";
import { bookmarkAsyncThunk } from "../redux/asyncThunk/bookmark.asyncThunk";
import ButtonHeader from "../component/ButtonHeader";
import { BsBookmarkDashFill } from "react-icons/bs";

export const PostListPage = () => {
  const [bookmarksIds, setBookmarksIds] = useState([]);
  const [isBookmarkPage, setIsBookmarkPage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [allPostList, setAllPostList] = useState([]);
  const { pageData } = useSelector((state) => state?.pageDataSlice);
  const { myPost } = useSelector((state) => state?.myPostSlice);
  const { status, posts, totalPages, totalPostCount } = useSelector(
    (state) => state?.post
  );

  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);

  // useEffect(() => {
  //   const uniqueObject = uniqBy(posts, (obj) => obj._id);
  //   setAllPostList(uniqueObject);
  // }, [posts]);

  useEffect(() => {
    if (!isBookmarkPage) {
      fetchPosts();
    }
  }, [pageData]);

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    setPreviousScrollPosition(scrollPosition);
  }, []);

  const handleNavigateToDetailsPage = (id) => {
    sessionStorage.setItem("scrollPosition", window.pageYOffset);
    navigate(`/${id}`);
  };

  const fetchPosts = () => {
    setIsLoading(true);
    if (myPost) {
      dispatch(postAsyncThunk.myPostLisAsyncThunk(pageData))
        .unwrap()
        .then((res) => {
          console.log("res", res);
          setIsLoading(false);
        });
    } else {
      dispatch(postAsyncThunk.getAllPost(pageData)).then((res) => {
        console.log("res", res);
        setIsLoading(false);
      });
    }
  };

  const handleDeletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postAsyncThunk.deletePostAsyncThunk({ id }))
          .unwrap()
          .then((res) => {
            dispatch(filterPosts(id));
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fetchPosts();
          })
          .catch((err) => {
            console.log("something went wrong");
          });
      }
    });
  };

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

  const handlePostView = (status) => {
    setIsBookmarkPage(false);
    setAllPostList([]);
    dispatch(removePosts());
    dispatch(pageDataReducer({ page: 1 }));
    dispatch(myPostReducer(status));
  };
  const fetchBookmarkPost = () => {
    // setIsLoading(true);
    dispatch(bookmarkAsyncThunk.getBookmakrIdsAsyncThunk())
      .unwrap()
      .then((res) => {
        // setIsLoading(false);
        setBookmarksIds(res?.data);
      })
      .catch((err) => {
        // setIsLoading(false);
      });
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
            fetchBookmarkPost();

            // fetchBookmarkPost();
          })
          .catch((err) => {
            console.log("something went wrong");
          });
      }
    });
  };

  const addPostAsABookmarkHandler = (id) => {
    dispatch(
      bookmarkAsyncThunk.addBookmarkPostAsynThunk({
        postId: id,
      })
    )
      .unwrap()
      .then((res) => {
        fetchBookmarkPost();
      });
  };

  useEffect(() => {
    fetchBookmarkPost();
  }, []);

  return (
    <div>
      <ButtonHeader handlePostView={handlePostView} myPost={myPost} />

      <div className="">
        <ScrollToTop previousScrollPosition={previousScrollPosition} />
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 md:grid-cols-3">
          {posts?.length == 0 ? (
            <LottieAnimation file={lottiee2} />
          ) : (
            posts?.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <div className="block">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleNavigateToDetailsPage(item?._id)}
                  >
                    <div className="relative h-48">
                      <img
                        src={`http://localhost:3000/${item.cover}`}
                        alt={item.title}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-xl font-bold text-black">
                          {item.title}
                        </h1>
                      </div>
                      <p className="text-gray-600 mb-4  ">
                        {item.shortDescription?.slice(0, 100)}...
                      </p>
                      <div className="flex flex-wrap gap-5">
                        {item?.categories?.map((item) => {
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
                      {!myPost && (
                        <>
                          <div className="w-12 h-12">
                            <img
                              className="object-cover w-12 h-12 rounded-full"
                              src="https://media.istockphoto.com/id/882115168/photo/portrait-of-a-gloomy-young-man-in-a-dark-background.jpg?s=1024x1024&w=is&k=20&c=SW0MmcwwlSte8COFJeQ_26G0l6dVCqPJ1n-WK6czO6A="
                              alt="Author"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-4">
                              <span className="text-1xl font-medium text-gray-600">
                                {item?.author?.name}
                              </span>
                              <div>
                                <h1 className="text-green-700">Follow</h1>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <BiTimeFive className="text-gray-500 mr-1" />
                              <span className="text-sm text-gray-500">
                                {moment(item?.createdAt).format(
                                  "MMM Do YY h:mm A"
                                )}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex text-2xl mr-8 items-center cursor-pointer text-black gap-2 ">
                      <span className="">
                        {bookmarksIds?.some((i) => i?.postId === item?._id) ? (
                          <BsBookmarkDashFill
                            onClick={() => {
                              const bookmarkId = bookmarksIds.find(
                                (bookmark) => bookmark?.postId === item?._id
                              )?._id;
                              console.log(bookmarkId);
                              removeFromBookmark(bookmarkId);
                            }}
                          />
                        ) : (
                          <MdOutlineBookmarkAdd
                            onClick={() => addPostAsABookmarkHandler(item?._id)}
                          />
                        )}
                      </span>
                      {myPost && (
                        <div className="flex items-center gap-2">
                          <span>
                            <AiOutlineDelete
                              onClick={() => handleDeletePost(item?._id)}
                            />
                          </span>
                          <Link
                            to={`/update-post/${item?._id}`}
                            className="text-xl"
                          >
                            <GrEdit />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="my-10">
          {isLoading && pageData.page >= 2 && <LoadingIndicator />}
        </div>
      </div>
    </div>
  );
};
