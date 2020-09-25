import React from 'react';
import axios from 'axios';

export default function LoginLogout() {

  function login() {
    const userID = Number(document.querySelector('#login-user-id').value);
    document.cookie = `userID=${userID};`;
  }

  function logout() {
    document.cookie = `userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  return (
    <div>
      <label htmlFor="login">User ID:</label>
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
      <button type='button' name='logout' onClick={() => logout()}>Logout</button>
    </div>
  );
}