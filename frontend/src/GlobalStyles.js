import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { TextField } from "@mui/material";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Encode Sans Expanded", sans-serif;
  }
`;

export const Container = styled.div`
  max-width: 1300px;
  width: 100%;
  z-index: 1;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;
  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const Button = styled.button`
  border-radius: 22px;
  background: #2bc66a;
  padding: ${({ big }) => (big ? "12px 90px" : "10px 21px")};
  // height: 100%;
  // width: 100%;
  color: white;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    background: transparent;
    border-style: solid;
    border-width: medium;
    border-color: #2bc66a;
    color: #000;
  }
`;

export const Btn = styled.button`
  padding: ${({ big }) => (big ? "12px 64px" : "10px 21px")};
  border-style: solid;
  border-width: medium;
  border-color: #ffb443;
  background: transparent;
  color: #000;
  height: 100%;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  outline: none;
  border-radius: 22px;
  &:hover {
    transition: all 0.25 ease-in-out;
    background: #ffb443;
    border: none;
    color: #fff;
  }
`;

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2bc66a",
      borderRadius: "40px",
      borderWidth: "medium",
    },

    "&:hover fieldset": {
      borderColor: "#2bc66a",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
      borderWidth: "medium",
    },
  },
});

export const TextFieldCustom = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2bc66a",
      borderRadius: "40px",
      borderWidth: "medium",
    },

    "&:hover fieldset": {
      borderColor: "#2bc66a",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
      borderWidth: "medium",
    },
  },
});

export default GlobalStyle;
