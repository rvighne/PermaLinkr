(function () {
"use strict";

let copyToggle = document.getElementById('copy-toggle');

chrome.storage.sync.get('copyLinks', items => {
	copyToggle.checked = items.copyLinks;
	copyToggle.disabled = false;
});

copyToggle.addEventListener('change', function updateOptions() {
	chrome.storage.sync.set({
		copyLinks: this.checked
	});
});

})();