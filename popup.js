chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg) {
    document.getElementById("spf").innerText = request.msg;
  }
});
window.onload = function () {
  chrome.storage.local.get('record', function (result) {
    console.log(result);
    result.record.forEach((record) => {
      let ele = document.createElement('div');
      if (/spf|dkim|dmarc/i.test(record)) {
        ele.style = "color: red";
      }
      ele.innerText = record;
      document.body.appendChild(ele);
    });
  });
}
