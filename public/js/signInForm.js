const formOfSignUp = document.forms.signIn;

formOfSignUp.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const body = Object.fromEntries(new FormData(formOfSignUp));
    const data = await fetch(
      '/signIn',
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) },
    );
    const { accessToken } = await data.json();
    if (accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      await fetch('/valid', {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      });
      window.location.href = '/account';
    }
  } catch (error) {
    console.error(error);
  }
});
