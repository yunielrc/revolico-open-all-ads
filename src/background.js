// Declarative Content
const rule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.revolico.com', schemes: ['https'] },
      css: ["div[class^='List__Pagination']"]
    })
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()]
}

chrome.runtime.onInstalled.addListener((details) => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([rule])
  })
  // Context Menu
  chrome.contextMenus.create({
    id: 'menu-open-adds',
    title: 'Revolico: Open all ads',
    contexts: ['page'],
    documentUrlPatterns: ['https://www.revolico.com/*']
  })
})

// Functions

/// Open All urls
function openAllUrls () {
  chrome.tabs.getSelected((tab) => {
    chrome.tabs.sendMessage(tab.id, { method: 'get-ads-urls' }, (response) => {
      response.result.forEach(url => {
        chrome.tabs.create({ url })
      })
    })
  })
}

// Event Handlers

/// key event handler
chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-adds') {
    openAllUrls()
  }
})

/// context menu event handler
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'menu-open-adds') {
    openAllUrls()
  }
})
