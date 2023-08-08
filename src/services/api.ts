async function get(endpoint: string) {
  const token = localStorage.getItem('access_token')

  return await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'GET'
  })
}

async function post(endpoint: string, body: {}) {
  const token = localStorage.getItem('access_token')

  return await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
}

export async function getMe() {
  return await get(`v1/me`)
}

export async function postToken(code: string) {
  let codeVerifier = localStorage.getItem('code_verifier')!

  let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: import.meta.env.VITE_LOCALHOST_URI,
    client_id: import.meta.env.VITE_CLIENT_ID,
    code_verifier: codeVerifier
  })

  return await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  })
}
