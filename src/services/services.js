// const API_URL = "http://localhost:5000"
// const API_URL = "https://9e26-64-189-206-39.ngrok.io"
// const API_URL = "http://localhost/resicomm-server/index.php";
// const API_URL = "http://127.0.0.1:8000/api"
const API_URL = "https://kxs9016.uta.cloud/resicomm-server/index.php"

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

let putOptions = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
};

let deleteOptons = {
  method: "DELETE",
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

export const getAllUsers = async () => {
  return await fetch(`${API_URL}/users`).then((res) => res.json());
};

export const getEmployees = async () => {
  return await fetch(`${API_URL}/employees`).then((res) => res.json());
};

export const getUsers = async () => {
  return await fetch(`${API_URL}/all-users`).then((res) => res.json());
};

export const signIn = async (data) => {
  return await fetch(`${API_URL}/user/login`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const updateUser = async (data) => {
  return await fetch(`${API_URL}/user/update`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const updateAmenity = async (data) => {
  return await fetch(`${API_URL}/amenity/update`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const updateEvent = async (data) => {
  return await fetch(`${API_URL}/events/update`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const updateAccessLog = async (data) => {
  return await fetch(`${API_URL}/access-logs/update`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getServices = async () => {
  return await fetch(`${API_URL}/amenities`).then((res) => res.json());
};

export const getVehicles = async () => {
  return await fetch(`${API_URL}/vehicles`).then((res) => res.json());
};

export const getAccessLogsCount = async () => {
  return await fetch(`${API_URL}/access-logs-count`).then((res) => res.json());
};

export const getAccessLogsReport = async () => {
  return await fetch(`${API_URL}/access-logs-report`).then((res) => res.json());
};

export const getVehicleDetails = async (data) => {
  return await fetch(`${API_URL}/vehicles?id=${data.vehicle_id}`, {
    ...getOptions,
  }).then((res) => res.json());
};

export const getUser = async (data) => {
  return await fetch(`${API_URL}/users?user_id=${data.user_id}`, {
    ...getOptions,
  }).then((res) => res.json());
};

export const getAmenityDetails = async (data) => {
  return await fetch(`${API_URL}/amenity?id=${data.amenity_id}`, {
    ...getOptions,
  }).then((res) => res.json());
};

export const getEventDetails = async (data) => {
  return await fetch(`${API_URL}/events?id=${data.event_id}`, {
    ...getOptions,
  }).then((res) => res.json());
};

export const getEvents = async (data) => {
  return await fetch(`${API_URL}/events`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const visitRequest = async (data) => {
  return await fetch(`${API_URL}/visits/create`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};


export const createEvent = async (data) => {
  return await fetch(`${API_URL}/events/create`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const registerEvent = async (data) => {
  return await fetch(`${API_URL}/events/register`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const getVisitRequests = async (data) => {
  return await fetch(`${API_URL}/visits/get`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const getResidentVisitRequests = async (data) => {
  return await fetch(`${API_URL}/visits/resident`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const cancelEventRegistration = async (data) => {
  return await fetch(`${API_URL}/events/cancel-registration`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const getEventRegistrations = async (data) => {
  return await fetch(`${API_URL}/events/registrations`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const updateVehicleDetails = async (data) => {
  return await fetch(`${API_URL}/vehicles/update?id=${data.vehicle_id}`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const updateVisitRequest = async (data) => {
  return await fetch(`${API_URL}/visits/edit?id=${data.request_id}`, {
    body: JSON.stringify(data),
    ...putOptions,
  }).then((res) => res.json());
};

export const joinMembership = async (data) => {
  return await fetch(`${API_URL}/add-membership?user_id=${data.user_id}&membership_id=${data.membership_id}`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const leaveMembership = async (data) => {
  return await fetch(`${API_URL}/remove-membership?user_id=${data.user_id}&membership_id=${data.membership_id}`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const addVehicle = async (data) => {
  return await fetch(`${API_URL}/add-vehicle`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const addPayment = async (data) => {
  return await fetch(`${API_URL}/add-payment`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const getPayments = async (data) => {
  return await fetch(`${API_URL}/payments`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const deleteVehicle = async (data) => {
  return await fetch(`${API_URL}/vehicles?id=${data.vehicle_id}`, {
    body: JSON.stringify(data),
    ...deleteOptons,
  }).then((res) => res.json());
};

export const deleteVisitRequest = async (data) => {
  return await fetch(`${API_URL}/visits?id=${data.request_id}`, {
    body: JSON.stringify(data),
    ...deleteOptons,
  }).then((res) => res.json());
};

export const deleteEvent = async (data) => {
  return await fetch(`${API_URL}/events?id=${data.id}`, {
    body: JSON.stringify(data),
    ...deleteOptons,
  }).then((res) => res.json());
};

export const register = async (data) => {
  return await fetch(`${API_URL}/register`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const addEmployee = async (data) => {
  return await fetch(`${API_URL}/employee/add`, {
    ...postOptions,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const editEmployee = async (data) => {
  return await fetch(`${API_URL}/employee/edit`, {
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

export const getLocations = async () => {
  return await fetch(`${API_URL}/locations`, {
    ...getOptions,
    // body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getAccessLogs = async (data) => {
  return await fetch(`${API_URL}/access-logs/resident`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const getAccessLogsManager = async (data) => {
  return await fetch(`${API_URL}/access-logs/manager`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const getAccessLogsSecurityManager = async (data) => {
  return await fetch(`${API_URL}/access-logs/security-manager`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const addAccessLog = async (data) => {
  return await fetch(`${API_URL}/access-logs/create`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};


export const getChat = async (data) => {
  return await fetch(`${API_URL}/chat`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};

export const sendMessage = async (data) => {
  return await fetch(`${API_URL}/chat/send`, {
    body: JSON.stringify(data),
    ...postOptions,
  }).then((res) => res.json());
};


