// const API_URL = "http://localhost:5000"
// const API_URL = "https://9e26-64-189-206-39.ngrok.io"
const API_URL = "http://localhost/resicomm-backend/index.php"

let postOptions = {
  method: "POST",
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
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

export const users = async () => {
  return await fetch(`${API_URL}/`).then(res=> res.json())
}

export const getEmployees = async () => {
  return await fetch(`${API_URL}/employees`).then(res=> res.json())
}

export const signIn = async (data) => {
  console.log(data)
  return await fetch(`${API_URL}/users/login`, {
    ...postOptions,
    body: JSON.stringify(data)
  }).then(res=> res.json())
}

// export const testlogin = () => {
//   return axios.get(`${API_URL}/testlogin`)
// }

export const register = async (data) => {
  return await fetch(`${API_URL}/register`, {
    ...postOptions,
    body: JSON.stringify(data)
  }).then(res=> res.json())
}

export const verifyEmail = async (data) => {
  return await fetch(`${API_URL}/verify`, {
    ...getOptions
  }).then(res=> res.json())
}
