function openNewTab(info) {
  const inputText = encodeURIComponent(info.selectionText.substring(0, 50));
  window.open("https://newzly-api.herokuapp.com/text/" + inputText, "_blank").focus();
}

chrome.contextMenus.create({
  title: "Open via HashNews",
  contexts: ["all"],
  onclick: openNewTab,
});
