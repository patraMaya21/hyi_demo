const BASE_URL = 'https://trace.techatomfusion.com/oauth/token?client_id=test&_format=json';

const CLIENT_ID = 'test';
const CLIENT_SECRET = 'testing4321'; 

export const loginUser = async (username, password) => {
  console.log('Logging in with:', username);

  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: username,
      password: password,
    }),
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    // console.log('Raw response:', text);
    throw new Error('Server returned an invalid response.');
  }

  if (!response.ok || data.error) {
    throw new Error(data.error_description || 'Invalid credentials');
  }

  return data;
};
