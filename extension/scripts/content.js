(function () {
"use strict";

let lastEl = null;

// TODO: style this to be fixed to top left to it doesn't flash/break CSS
let copyHelper = document.createElement('textarea');
copyHelper.classList.add('PermaLinkr');
copyHelper.classList.add('copy-helper');


// TODO: Make this more efficient by walking up the DOM tree element by element, rather than regenerating a large HTMLCollection each time
function* elementsAbove(el) {
	yield el;

	let allEls = document.body.getElementsByTagName('*');
	let els = Array.prototype.slice.call(allEls, 0, Array.prototype.indexOf.call(allEls, el));

	for (let i = els.length - 1; i >= 0; --i) {
		yield els[i];
	}
}

function getFragID(srcEl) {
	for (let el of elementsAbove(srcEl)) {
		if (el.id) {
			return el.id;
		} else if (el.tagName === 'A' && el.name) {
			return el.name;
		}
	}

	return null;
}

function copyText(text) {
	document.body.appendChild(copyHelper);

	// TODO: Save user's previous selection and then return it after copying
	copyHelper.value = text;
	copyHelper.select();
	document.execCommand('copy', false, null);

	document.body.removeChild(copyHelper);
}

function makeLink() {
	let fragID = getFragID(lastEl);
	if (fragID) {
		location.hash = fragID;

		chrome.storage.sync.get('copyLinks', items => {
			if (items.copyLinks) {
				copyText(location);
			}
		});
	}
}

document.addEventListener('contextmenu', e => {
	lastEl = e.target;
});

chrome.runtime.onMessage.addListener(message => {
	if (message === 'make-link') {
		makeLink();
	}
});

})();
