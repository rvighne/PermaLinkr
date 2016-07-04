(function () {
"use strict";

let lastEl = null;
let allEls = document.body.getElementsByTagName('*');

let copyHelper = document.createElement('textarea');
copyHelper.classList.add('PermaLinkr-copy-helper');

function ifOptionSet(option, func, ...args) {
	chrome.storage.sync.get(option, items => {
		if (items[option]) {
			func(...args);
		}
	});
}

// TODO: Make this more efficient by walking up the DOM tree element by element, rather than regenerating a large HTMLCollection each time
function* elementsAbove(el) {
	yield el;

	let els = Array.from(allEls);
	for (let i = els.indexOf(el) - 1; i >= 0; --i) {
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
		ifOptionSet('copyLinks', copyText, location);
	}
}

function createLinkIcon(el, target) {
	let img = new Image;
	img.src = chrome.extension.getURL('icons/icon.svg');
	img.alt = "Permalink";
	img.classList.add('PermaLinkr-heading-icon');

	let link = document.createElement('a');
	link.href = '#' + target;
	link.title = "Permalink to this section";
	link.classList.add('PermaLinkr-heading-link');

	link.addEventListener('click', () => {
		ifOptionSet('copyLinks', copyText, link.href);
	});

	link.appendChild(img);
	el.appendChild(link);
}

function findFragments() {
	let els = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]");
	for (let el of els) {
		createLinkIcon(el, el.id);
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

ifOptionSet('headingLinks', findFragments);

})();
