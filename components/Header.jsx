const React = require('react');

function Header() {
  return (
    <header>
      <a href="/"><img src="/images/logo.png" alt="logo_takeMyMoney" width={65} height={65} /></a>
      <div id="blockOfButtons">
        <a href="/signIn"><button type="button">SignIn</button></a>
        <a href="/signUp"><button type="button">SignUp</button></a>
      </div>
    </header>
  );
}

module.exports = Header;
