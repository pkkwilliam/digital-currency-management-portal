export function execute(service) {
  return new Promise((resolve, reject) => {
    const { body, method, url } = service
    return fetch(url, { body: JSON.stringify(body), method })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {})
  })
}

function processResponse(response, resolve, reject) {
  const { status } = response
  if (status === '200') {
  }
  if (status === '202') {
    resolve()
    return
  }
}
