const formOfSignIn = document.forms.signIn;

formOfSignIn.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const body = Object.fromEntries(new FormData(formOfSignIn));
    const data = await fetch(
      '/signIn',
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) },
    );
    const { accessToken } = await data.json();
    if (accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      window.location.href = '/account';
    }
  } catch (error) {
    console.error(error);
  }
});
