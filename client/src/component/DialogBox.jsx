import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { postCategoryAsyncThunk } from "../redux/asyncThunk/postCategory.asyncThunk";
import LoadingSvg from "./LoadingSvg";
import { Toaster } from "../utils/Toaster";
import InputBox from "./InputBox";

export function DialogBox(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { openDialog, setOpenDialog } = props;

  const initialValues = {
    name: "react",
    description: "frontend libary",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("description is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: (data) => {
      setIsLoading(true);
      dispatch(postCategoryAsyncThunk.createNewPostCategoryAsyncThunk(data))
        .unwrap()
        .then((res) => {
          setOpenDialog((prev) => !prev);
          setIsLoading(() => false);
          Toaster.fire({
            icon: "success",
            title: "success",
            text: "New Category Crated Successfully",
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toaster.fire({
            icon: "info",
            title: "Error",
            text: err?.error?.error,
          });
        });
    },
  });

  return (
    <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
      <DialogTitle className="flex justify-center border-b-2 ">
        Create New Category
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <div className="px-4 py-3">
          <InputBox
            label={"Name of category"}
            type={"text"}
            id={"name"}
            placeholder="Enter category name"
            onChange={formik.handleChange}
            value={formik.values.name}
            errors={formik.errors.name}
            touched={formik.touched.name}
          />
          <InputBox
            label={"Description"}
            placeholder="Enter category Description"
            type="text"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            errors={formik.errors.description}
            touched={formik.touched.description}
          />

          <button className="border w-full bg-pink-600 px-4 py-2 rounded-full text-white">
            {isLoading ? <LoadingSvg /> : "Save"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
