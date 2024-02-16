const React = require('react');

function MainBody({ children }) {
  return (
    <>
      {children}
      <main>
        <div className="banner">
          <div className="banner-text">
            <h1>SUPPORT WITH A CLICK</h1>
            <p>EMPOWER DREAMS, FUEL PASSIONS</p>
          </div>
        </div>
        <div id="about_us">
          <div>
            <h1>ABOUT US</h1>
            <p>
              We are a platform for donating to various projects.
              Members of our platform develop pharmaceuticals,
              robotic solutions, make discoveries in the field of artificial intelligence,
              and even develop games.
            </p>
            <p>
              You can join the ranks of those who are helping to implement large projects today,
              or, on the contrary,
              you need financial help and want to tell everyone about your work.
            </p>
            <p>Join us and let&apos;s make the world a better place!😃</p>
          </div>
          <div />
        </div>
        <div>⭐JOIN TO US⭐</div>
      </main>
      <footer>FOOTER</footer>
    </>
  );
}

module.exports = MainBody;
