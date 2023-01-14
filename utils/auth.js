import axios from "axios";
const API_KEY = "AIzaSyB8DXJLhL1wgaPQh-gW2sFjjxTHb9Bkid4";

export function createUser(email, password) {
  return authenicate("signUp", email, password);
}

export function login(email, password) {
  return authenicate("signInWithPassword", email, password);
}

async function authenicate(mode, email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );

  const token = response.data.idToken;
  return token;
}
