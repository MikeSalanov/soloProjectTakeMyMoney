const formOfSignUp = document.forms.signUp;

formOfSignUp.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const body = Object.fromEntries(new FormData(formOfSignUp));
    const dataOfRegistration = await fetch(
      '/signUp',
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) },
    );
    if (dataOfRegistration.status === 201) {
      delete body.confirmPassword;
      const { accessToken } = await (await fetch(
        '/signIn',
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) },
      )).json();
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        window.location.href = '/account';
      }
    } else {
      document.querySelector('form[name="signUp"]').appendChild(document.createElement('p'));
      document.querySelector('p').innerText('INVALID AUTH DATA');
    }
  } catch (error) {
    console.error(error);
  }
});
