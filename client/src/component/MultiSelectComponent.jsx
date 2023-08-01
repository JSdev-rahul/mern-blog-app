import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MultiSelect } from "react-multi-select-component";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function removeElementsOccurringTwoTimes(arr) {
  // Step 1: Count occurrences of each object based on their 'id' property
  const elementCounts = {};
  for (const obj of arr) {
    const id = obj?.name;
    elementCounts[id] = (elementCounts[id] || 0) + 1;
  }
  // Step 2: Create a new array without objects occurring two times
  const result = arr?.filter((obj) => elementCounts[obj?.name] !== 2);
  return result;
}

export default function MultiSelectComponent({ categorys, formik }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newValue = removeElementsOccurringTwoTimes(value);
    formik.setFieldValue("categories", newValue);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Categories</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={formik.values?.categories || []}
          onChange={handleChange}
          input={<OutlinedInput label="Select Categories" />}
          renderValue={(selected) =>
            selected?.map((item) => item?.name).join(",")
          }
          MenuProps={MenuProps}
        >
          {categorys?.map((item) => (
            <MenuItem key={item._id} value={item}>
              <Checkbox
                checked={formik.values.categories?.some(
                  (category) => category._id.toString() === item._id.toString()
                )}
              />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
