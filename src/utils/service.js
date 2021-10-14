export async function get ({ url = '' }) {
  if (url === '') return failed('Invalid url')
  try {
    const response = await window.fetch(url)
    return await response.json()
  } catch (err) {
    console.log('Failed to fetch data')
  }
  return failed('Fetch get failed')
}

// Example POST method implementation:
export async function post (url = '', data = {}) {
  if (url === '') return failed('Invalid url')
  try {
  // Default options are marked with *
    const response = await window.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  } catch (err) {
    console.log('Fetch error', err)
  }
  return failed('Fetch post failed')
}

function failed (error) {
  return { success: false, error }
}
