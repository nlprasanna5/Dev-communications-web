

// export const BASE_URL="/api"
// export const BASE_URL=import.meta.env.VITE_API_URL


// const apiUrl = import.meta.env.VITE_API_URL;

// export const BASE_URL = apiUrl.includes("16.171.193.72")
//   ? `/api`
//   : apiUrl;

const hostname = window.location.hostname;

export const BASE_URL =
  hostname === "16.171.193.72"
    ? "/api"
    : import.meta.env.VITE_API_URL;

console.log("BASE_URL",BASE_URL);


export const COLORS = {
  PRIMARY: "#484CF8",
  SECONDARY: "#825AED",
  SUCCESS: "#17B278",
  DANGER: "#E23933",
  WARNING: "#EC9310",

  BACKGROUND: "#05152C",
  CARD: "#10223A",
  BORDER: "#12233B",

  TEXT_PRIMARY: "#EDEFF2",
  TEXT_SECONDARY: "#7D91A9",
};

