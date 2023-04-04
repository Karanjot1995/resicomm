// const API_URL = "http://localhost:5000"
// const API_URL = "https://9e26-64-189-206-39.ngrok.io"
const API_URL = "http://localhost/resicomm-backend/index.php";

let postOptions = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
};

let getOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

let options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const users = async () => {
  return await fetch(`${API_URL}/`).then((res) => res.json());
};

export const getEmployees = async () => {
  return await fetch(`${API_URL}/employees`).then((res) => res.json());
};

export const signIn = async (data) => {
  console.log(data);
  return await fetch(`${API_URL}/user/login`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getServices = async () => {
  return await fetch(`${API_URL}/amenities`).then(res=> res.json())
}

export const register = async (data) => {
  return await fetch(`${API_URL}/register`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const verifyEmail = async (data) => {
  return await fetch(
    `${API_URL}/verify?email=${data.email}&hash=${data.hash}`,
    {
      ...getOptions,
    }
  ).then((res) => res.json());
};

export const resendVerification = async (data) => {
  return await fetch(`${API_URL}/resend-verification`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const forgetPassword = async (data) => {
  return await fetch(`${API_URL}/forget-password`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const resetPassword = async (data) => {
  return await fetch(`${API_URL}/reset-password`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getVendors = async () => {
  return await fetch(`${API_URL}/users/vendors`, {
    ...getOptions,
    // body: JSON.stringify(data),
  }).then((res) => res.json());
};
