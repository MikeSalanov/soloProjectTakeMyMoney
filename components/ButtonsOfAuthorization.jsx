const React = require('react');

function ButtonsOfAuthorization() {
  return (
    <div id="blockOfButtons">
      <a href="/signIn"><button type="button">SignIn</button></a>
      <a href="/signUp"><button type="button">SignUp</button></a>
    </div>
  );
}

module.exports = ButtonsOfAuthorization;
