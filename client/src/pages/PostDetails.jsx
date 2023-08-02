import React, { useEffect, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postAsyncThunk } from "../redux/asyncThunk/post.asyncThunk";
import moment from "moment";
import LoadingIndicator from "../component/LodingIndigator";
export const PostDetails = () => {
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(postAsyncThunk.getPostDetails({ id }))
      .unwrap()
      .then((res) => {
        setPost([res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="lg:mx-auto md:px-8 lg:px-16 mt-20 md:mt-10 lg:mt-20 max-w-screen-lg">
      {post ? (
        post?.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            >
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">{item?.title}</h1>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
                <div className="w-16 h-16 md:w-12 md:h-12">
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src="https://media.istockphoto.com/id/882115168/photo/portrait-of-a-gloomy-young-man-in-a-dark-background.jpg?s=1024x1024&w=is&k=20&c=SW0MmcwwlSte8COFJeQ_26G0l6dVCqPJ1n-WK6czO6A="
                    alt="author"
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <span className="text-base md:text-lg font-medium text-gray-600">
                    {item?.author?.name}
                  </span>
                  <div className="md:ml-4">
                    <h1 className="text-green-700">Follow</h1>
                  </div>
                </div> 
                <div className="flex items-center mt-2 md:mt-0">
                  <BiTimeFive className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">
                    {moment(item?.createdAt).format("MMM Do YY h:mm A")}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${item.cover}`}
                  alt="post cover"
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              <p className="text-lg text-gray-700 mb-4">
                {item?.shortDescription}
              </p>
              <article
                className="text-base text-gray-600"
                dangerouslySetInnerHTML={{ __html: item?.content }}
              />
            </div>
          );
        })
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
};
