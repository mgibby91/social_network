import React from 'react';
import axios from 'axios';

export default function LoginLogout() {

  function login() {

    const userID = Number(document.querySelector('#login-user-id').value);
    console.log('userID', userID);

    document.cookie = `userID=${userID}; expires=Thu, 18 Dec 2021 12:00:00 UTC; path=/`

    axios.post('http://localhost:8001/api/login', { userID })
      .then((res) => {
        console.log(res);
      })

  }

  return (
    <div>
      <label htmlFor="login">User ID</label>
      <select name="login" id="login-user-id">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <button type='button' name='login' onClick={() => login()}>Login</button>
    </div>
  );
}