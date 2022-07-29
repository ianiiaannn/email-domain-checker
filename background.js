chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  processURL(tab);
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, processURL);
});

function processURL(tab) {
  let domain = new URL(tab.url).host;
  domain = domain.replace("www.", "");
  fetch(`https://dns.google/resolve?name=${domain}&type=SPF`, { headers: { accept: "application/text-json" } }).then((response) => {
    return response.json();
  }).then((json) => {
    try {
      let spf = json.Answer[0].data.replace(/\<\>/g, "");
      chrome.storage.local.set({spf: spf});
    } catch(err) {
      console.log(err);
      chrome.storage.local.set({spf: "No SPF record found"});
    }
  });
}
