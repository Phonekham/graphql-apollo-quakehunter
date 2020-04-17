import React, { useState } from "react";

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    login({
      variables: {
        email: email,
        password: password,
      },
    });
  };
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          id=""
          placeholder="enter email"
          value={email}
          onChange={emailHandler}
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          name="password"
          id=""
          placeholder="password"
          value={password}
          onChange={passwordHandler}
        />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default LoginForm;
