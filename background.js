var itson = false;
var gotchas = [];
var button = chrome.browserAction;
var req = chrome.webRequest.onBeforeRequest;

button.onClicked.addListener(function(){
  if (itson) {
    req.removeListener(failer);
    gotchas = [];
    button.setBadgeText({text: ""});
    button.setTitle({title: "Click to fail"});
  } else {
    req.addListener(
      failer,
      {
        urls: urls,
        types: ['script']
      },
      ["blocking"]
    );
    button.setTitle({title: "It's ON. SHIFT-Reload your page"});
  }
  itson = !itson;
  button.setIcon({path:"icon-" + (itson ? 'on' : 'off') + ".png"});
});

function failer(info) {
  console.log(info.url);
  gotchas.push(info.url)
  button.setBadgeText({text: "" + gotchas.length});
  button.setTitle({title: gotchas.join('\n')});
  return {
    redirectUrl: 'https://blackhole.webpagetest.org'
  };
}

