const React = require('react');

function AccountCard({ login }) {
  return (
    <div name="cardAccount">
      {login}
    </div>
  );
}

module.exports = AccountCard;
