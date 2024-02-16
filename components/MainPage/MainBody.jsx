const React = require('react');

function MainBody({ children }) {
  return (
    <>
      {children}
      <main>
        <div className="banner" />
        <div />
      </main>
    </>
  );
}

module.exports = MainBody;
