var fascript = document.createElement("script");
fascript.setAttribute(
  "src",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
);
document.head.appendChild(fascript);

var div = document.createElement("a");
div.style.cssText = `
position:fixed;
width:50px;
height:50px;
bottom:60px;
right:30px;
background-color:#FFF;
border-radius:50%;`;
div.innerHTML =
  "<img src = 'https://cdn-icons-png.flaticon.com/512/1150/1150644.png' height='50' width='50'>";
div.target = "_blank";
div.id = "twitter-btn";

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, { subtree: true, childList: true });

function getTweetID(s) {
  var ind = 0,
    idstart;
  while (ind < s.length) {
    if (s[ind] == "/") idstart = ind;
    ind++;
  }
  return s.substring(idstart + 1);
}

function onUrlChange() {
  console.log("hello");
  var ss = window.location.href;
  if (ss.includes("/status/")) {
    tweetID = getTweetID(ss);
    div.href = "https://newzly-api.herokuapp.com/tweet/" + tweetID;
    document.body.appendChild(div);
  } else {
    thebtn = document.getElementById("twitter-btn");
    if (thebtn) thebtn.remove();
  }
}
