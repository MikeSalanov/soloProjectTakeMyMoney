const React = require('react');

function SignInForm() {
  return (
    <form name="signIn">
      <h1>Sign in</h1>
      <div>
        <input type="login" placeholder="Login" name="login" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Sign in</button>
      </div>
    </form>
  );
}

module.exports = SignInForm;
