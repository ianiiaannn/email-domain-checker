chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg) {
    document.getElementById("spf").innerText = request.msg;
  }
});
window.onload = function () {
  chrome.storage.local.get('spf', function (result) {
    document.getElementById("spf").innerText = result.spf;
  });
}
