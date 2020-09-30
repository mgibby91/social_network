import React from "react";
import axios from "axios";
import useApplicationData from "../../hooks/useApplicationData";
import ContextConsumer from "../../context/context";

export default function LoginLogout() {
  const { state, setSelectedUser } = useApplicationData();

  function login(data, set) {
    const userID = Number(document.querySelector("#login-user-id").value);
    document.cookie = `userID=${userID};`;

    axios.post("http://localhost:8001/api/login", { userID }).then((res) => {
      const username = res.data[0].username;

      set({ ...data, state: state, selected: res.data[0].username });
      const rightNavContainer = document.querySelector(
        ".sc-kEqYlL.gyZWym.right"
      );

      if (
        rightNavContainer.firstElementChild.className === "logged-in-username"
      ) {
        rightNavContainer.firstElementChild.remove();
      }

      console.log(rightNavContainer);

      const usernameHTML = `
          <div class='logged-in-username'>
            <p>Welcome <strong>${username}!</strong></p>
          </div>
        `;

      rightNavContainer.insertAdjacentHTML("afterbegin", usernameHTML);
    });
  }
  // console.log("State in login: ", state);
  function logout() {
    document.cookie = `userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    const rightNavContainer = document.querySelector(".sc-kEqYlL.gyZWym.right");

    if (
      rightNavContainer.firstElementChild.className === "logged-in-username"
    ) {
      rightNavContainer.firstElementChild.remove();
    }
  }

  return (
    <ContextConsumer>
      {({ data, set }) => {
        if (!data.selected) {
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
              <button type="button" name="login" onClick={() => login(data, set)}>
                Login
              </button>
            </div>
          );
        } else {
          return (

              <button type="button" name="logout" onClick={() => logout()}>
                Logout
              </button>
          )
        }
      }}
    </ContextConsumer>
  );
}
