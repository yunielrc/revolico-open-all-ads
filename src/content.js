chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.method === 'get-ads-urls') {
      const urls = []
      document.querySelectorAll('ul > li[data-cy="adRow"] > a[href]').forEach(e => { urls.push(e.href) })
      sendResponse({ result: urls })
      return
    }
    console.error(`Invalid mehtod ${request?.method}`)
  })
