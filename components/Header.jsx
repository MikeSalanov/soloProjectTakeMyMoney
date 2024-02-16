const React = require('react');

function Header({ children }) {
  return (
    <header>
      <a href="/"><img src="/images/logo.png" alt="logo_takeMyMoney" width={65} height={65} /></a>
      {children}
    </header>
  );
}

module.exports = Header;
