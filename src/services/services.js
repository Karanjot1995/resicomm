// const API_URL = "http://localhost:5000"
const API_URL = "https://9e26-64-189-206-39.ngrok.io"

let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

export const signIn = async (data) => {
  return await fetch(`${API_URL}/users/login`, {
    ...options,
    body: JSON.stringify(data)
  }).then(res=> res.json())
}

// export const testlogin = () => {
//   return axios.get(`${API_URL}/testlogin`)
// }

export const register = async (data) => {
  return await fetch(`${API_URL}/users/register`, {
    ...options,
    body: JSON.stringify(data)
  }).then(res=> res.json())
}
