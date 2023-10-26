const styles = {
  signUpHeader: {
    display: "flex",
  },
  textFields: {
    fontFamily: "Poppins",
    "& .MuiOutlinedInput-root:hover fieldset": {
      borderColor: "purple", // Change border color on hover
    },
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: "purple", // Change border color on focus
      // outline: " solid #ab47bc", // Change border color on focus
    },
  },
};

export const textFields = styles.textFields;
