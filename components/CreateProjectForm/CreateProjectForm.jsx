const React = require('react');

function SignUpForm() {
  return (
    <form name="signUp">
      <h1>Creating your project</h1>
      <div>
        <input type="text" placeholder="Name of project" name="nameOfProject" />
        <textarea placeholder="Description" name="description" />
        <button type="submit">Create project</button>
      </div>
    </form>
  );
}

module.exports = SignUpForm;
