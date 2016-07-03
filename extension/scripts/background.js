(function () {
"use strict";

// Set defaults
chrome.storage.sync.get(['copyLinks', 'headingLinks'], items => {
	if (!('copyLinks' in items)) {
		items.copyLinks = true;
	}

	if (!('headingLinks' in items)) {
		items.headingLinks = true;
	}

	chrome.storage.sync.set(items);
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
