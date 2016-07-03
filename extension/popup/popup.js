(function () {
"use strict";

// Load options from storage
let optsList = document.getElementById('options-list');
let optInputs = {};

for (let input of optsList.querySelectorAll("input[type=checkbox]")) {
	optInputs[input.name] = input;
}

chrome.storage.sync.get(Object.keys(optInputs), items => {
	for (let name in items) {
		let input = optInputs[name];
		input.checked = items[name];
		input.disabled = false;
	}
});

// Listen for changes in the options and update storage accordingly
optsList.addEventListener('change', e => {
	let el = e.target;

	if (el.type === "checkbox") {
		chrome.storage.sync.set({
			[el.name]: el.checked
		});
	}
});

})();
