(function () {
"use strict";

// Set defaults
chrome.storage.sync.get('copyLinks', items => {
	if (!('copyLinks' in items)) {
		chrome.storage.sync.set({
			copyLinks: true
		});
	}
});

function requestLink(info, tab) {
	chrome.tabs.sendMessage(tab.id, 'make-link');
}

chrome.contextMenus.create({
	title: "Permalink to this section",
	onclick: requestLink,

	contexts: ["page", "frame", "selection", "link", "editable", "image", "video", "audio"],
	documentUrlPatterns: ["*://*/*", "file:///*"]
});

})();
