document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('li > button').forEach((button) => {
    button.addEventListener('click', async () => {
      const nameOfRemovingProject = button.parentElement.firstChild.innerText;
      button.parentElement.remove();
      const lis = document.querySelectorAll('body > div:nth-of-type(2) > ul > li');
      lis.forEach((li) => (li.innerText === nameOfRemovingProject ? li.remove() : false));
      await fetch('/project', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameOfProject: nameOfRemovingProject,
        }),
      });
    });
  });

  const editableSpan = document.getElementById('editableSpan');

  editableSpan?.addEventListener('click', () => {
    const oldNameOfProject = editableSpan.innerText;
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = editableSpan.textContent;
    input.id = 'inputOfNewValue';
    input.value = '';
    editableSpan.parentNode.replaceChild(input, editableSpan);

    input.focus();

    input.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter') {
        await fetch('/project', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            oldName: oldNameOfProject,
            newName: document.getElementById('inputOfNewValue').value,
          }),
        });

        const newSpan = document.createElement('span');
        newSpan.textContent = input.value;
        newSpan.id = 'editableSpan';
        input.parentNode.replaceChild(newSpan, input);

        newSpan.addEventListener('click', editableSpan.onclick);
      }
    });
  });
});
