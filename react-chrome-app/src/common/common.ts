export const openUrl = (url: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tab: chrome.tabs.Tab = tabs[0]
    if (tab.id) chrome.tabs.update(tab.id, { url: url })
  })
}
