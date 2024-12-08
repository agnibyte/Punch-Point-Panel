import { useEffect, useState } from "react";
import Select from "react-select";
import { getUniqueKey, getConstant } from "@/utils/utils";

export default function CustomSearch(props) {
  const instanceId = getUniqueKey();

  const options = {
    instanceId: instanceId,
    placeholder: "Select Option",
    selectedValue: {},
    isSearchable: false,
    menuPosition: "fixed",
    ...props,
    className: "",
  };

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      border: "1px solid #9AB7BC",
      boxShadow: "none",
      padding: "0px",
      margin: "0px",
      "&:hover": {
        border: "1px solid #9AB7BC",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        // backgroundColor: isDisabled
        // 	? undefined
        // 	: isSelected
        // 	? getConstant(process.env.NEXT_PUBLIC_BRAND_NAME + "_SELECTED")
        // 	: isFocused
        // 	? getConstant(process.env.NEXT_PUBLIC_BRAND_NAME + "_FOCUSED")
        // 	: undefined,
        color: isDisabled ? "#ccc" : isSelected ? "black" : data.color,
        borderBottom: `1px solid #F3F3F3`,
        cursor: isDisabled ? "not-allowed" : "default",
        ":active": {
          ...styles[":active"],
          // backgroundColor: !isDisabled
          // 	? isSelected
          // 		? getConstant(process.env.NEXT_PUBLIC_BRAND_NAME + "_CURSOR_SELECTED")
          // 		: getConstant(process.env.NEXT_PUBLIC_BRAND_NAME + "_CURSOR_SELECTED")
          // 	: getConstant(process.env.NEXT_PUBLIC_BRAND_NAME + "_CURSOR_SELECTED"),
        },
        padding: "10px",
      };
    },
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded ? (
        <Select
          {...options}
          value={props.options.filter(
            (v) => v.value == props.selectedValue?.value
          )}
          onChange={props.onChange}
          styles={colorStyles}
        />
      ) : (
        <select>
          <option>{options.placeholder}</option>
        </select>
      )}
    </>
  );
}
