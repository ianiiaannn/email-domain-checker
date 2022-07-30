chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  processURL(tab);
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, processURL);
});

function processURL(tab) {
  let domain = new URL(tab.url).host;
  domain = domain.replace("www.", "");
  fetch(`https://dns.google/resolve?name=${domain}&type=ALL`, { headers: { accept: "application/text-json" } }).then((response) => {
    return response.json();
  }).then((json) => {
    try {
      const record = [];
      json.Answer.forEach((answer)=>{
        record.push(answer.data.replace(/\<\>/g, ""));
      });
      console.log(record);
      chrome.storage.local.set({record: record});
    } catch(err) {
      console.log(err);
      chrome.storage.local.set({record: ['No DNS record found']});
    }
  });
}
