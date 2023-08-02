import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import LoadingSvg from "../component/LoadingSvg";
import { DialogBox } from "../component/DialogBox";
import { ReactNotifications } from "react-notifications-component";
import MultiSelectComponent from "../component/MultiSelectComponent";
import { useEffect } from "react";
import { postCategoryAsyncThunk } from "../redux/asyncThunk/postCategory.asyncThunk";
import { formats, modules } from "./constant";
import { useFormik } from "formik";
import InputBox from "../component/InputBox";
import * as Yup from "yup";
import { objectToFormData } from "../utils/HandleFormData";
import { postAsyncThunk } from "../redux/asyncThunk/post.asyncThunk";
import { Toaster } from "../utils/Toaster";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../redux/slices/post.slice";
const CreatePostPage = ({ update }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state?.postCategory);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState({
    categories: [],
    title: "",
    shortDescription: "",
    content: "",
    cover: "",
  });
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required."),
    shortDescription: Yup.string().required("Short Description is required."),
    content: Yup.string().required("Content is required."),
    cover: Yup.string().required("Cover photo is required."),
    categories: Yup.array()
      .of(
        Yup.object().shape({
          _id: Yup.string().required("Category ID is required."),
          name: Yup.string().required("Category name is required."),
          // Add more validation rules for other fields in the category object if needed.
        })
      )
      .required("Categories are required."),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const categories = values?.categories?.map((item) => item?._id);

      let data;
      if (values?.cover?.name) {
        data = objectToFormData({ ...values, categories });
      } else {
        delete values.cover;
        data = objectToFormData({ ...values, categories });
      }

      setIsLoading(true);
      const asyncThunkAction = id
        ? postAsyncThunk.updatePostAsyncThunk({ data, id })
        : postAsyncThunk.createNewPostAsyncThunk(data);
      dispatch(asyncThunkAction)
        .unwrap()
        .then((res) => {
          if (id) {
            dispatch(updatePost(res?.data));
          }
          setIsLoading(false);
          Toaster.fire({
            icon: "success",
            title: "success",
            text: id
              ? "Post Updated Successfully"
              : "New Post Crated Successfully",
          });
          navigate(-1);
        })
        .catch((err) => {
          Toaster.fire({
            icon: "error",
            title: "Error",
            text: "All filed required",
          });
          setIsLoading(false);
        });
    },
  });

  useEffect(() => {
    dispatch(postCategoryAsyncThunk.getAllPostCategory())
      .unwrap()
      .then((res) => {
        console.log("res");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(postAsyncThunk.getPostDetails({ id }))
        .unwrap()
        .then((res) => {
          setInitialValues(res.data);
        })
        .catch((err) => {
          navigate("/");
        });
    }
  }, [id]);

  return (
    <div className="mt-24">
      <div>
        <DialogBox openDialog={openDialog} setOpenDialog={setOpenDialog} />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-2xl mx-auto mt-8 p-4 border rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-between ">
          <div>
            <MultiSelectComponent categorys={categorys} formik={formik} />
            {formik.values.categories.length === 0 ? (
              <div className="text-red-500 text-sm">{"Category required"}</div>
            ) : null}
          </div>
          <div>
            <button
              type="button"
              onClick={() => setOpenDialog(true)}
              className="border rounded-full bg-pink-600 text-white px-8 py-2 "
            >
              + category
            </button>
          </div>
        </div>

        <div className="mb-4">
          <InputBox
            label={"Title of blog"}
            type={"text"}
            id={"title"}
            name={"title"}
            placeholder="Enter Title of blog"
            onChange={formik.handleChange}
            value={formik.values.title}
            errors={formik.errors.title}
            touched={formik.touched.title}
          />
        </div>
        <div className="mb-4">
          <InputBox
            label={"  Short Description"}
            type={"text"}
            name="shortDescription"
            id={"shortDescription"}
            placeholder="Enter shortDescription of blog"
            onChange={formik.handleChange}
            value={formik.values.shortDescription}
            errors={formik.errors.shortDescription}
            touched={formik.touched.shortDescription}
          />
        </div>
        <div className="w-full h-24">
          {id && (
            <img
              className="w-full h-40"
              src={`${import.meta.env.VITE_API_URL}/${formik.values?.cover}`}
            ></img>
          )}
        </div>
        <div className="mb-4 mt-20">
          <InputBox
            label={"Cover Photo"}
            type={"file"}
            id={"cover"}
            name="cover"
            onChange={(e) => formik.setFieldValue("cover", e.target.files[0])}
            errors={formik.errors.cover}
            touched={formik.touched.cover}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="editor" className="block font-bold mb-2">
            Content
          </label>
          <ReactQuill
            theme="snow"
            formats={formats}
            modules={modules}
            value={formik.values?.content}
            name="content"
            onChange={(value) => {
              formik.setFieldValue("content", value);
            }}
            id="editor"
            className="bg-white p-4 border rounded"
            style={{ minHeight: "200px" }}
          />
          {formik.touched.content && formik.errors.content ? (
            <div className="text-red-500">{formik.errors.content}</div>
          ) : null}
        </div>
        <button className="bg-blue-500 w-full rounded-full text-white font-bold py-2 px-4">
          {isLoading ? <LoadingSvg /> : "Submit"}
        </button>
      </form>
      <ReactNotifications />
    </div>
  );
};

export default CreatePostPage;
