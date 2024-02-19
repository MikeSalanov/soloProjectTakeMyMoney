const React = require('react');

function AccountPage({ projectsOfPerson, allProjects, cardOfAccount }) {
  return (
    <>
      <div>
        {cardOfAccount}
        <button type="button">Create new project</button>
        <ul>
          {projectsOfPerson.map(({ id, name }) => (
            <li key={id}><span key={id} id="editableSpan">{name}</span><button key={id} type="button">❌</button></li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {allProjects.map(({ id, name }) => (<li key={id}>{name}</li>))}
        </ul>
      </div>
    </>
  );
}

module.exports = AccountPage;
