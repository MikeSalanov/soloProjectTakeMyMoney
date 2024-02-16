const React = require('react');

function SignUpForm() {
  return (
    <form name="signIn">
      <h1>Sign up</h1>
      <div>
        <input type="login" placeholder="Login" name="login" />
        <input type="password" placeholder="Password" name="password" />
        <input type="password" placeholder="Confirm password" name="confirm_password" />
        <button type="submit">Sign up</button>
      </div>
    </form>
  );
}

module.exports = SignUpForm;
