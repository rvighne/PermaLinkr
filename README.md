# PermaLinkr

PermaLinkr automatically finds [fragment identifiers](https://en.wikipedia.org/wiki/Fragment_identifier) in the headings and sections of webpages, and inserts links to them. These links end with a hash (#) followed by the `ID` or `name` of the targeted HTML element. When such a permalink is followed, it points directly to a specific section of that webpage and causes the browser to conveniently scroll to that section!

Additionally, PermaLinkr adds an item to the Chrome context menu that, when clicked on any element in a webpage, looks up the DOM tree for the nearest section that can be linked to. Then, the link is conveniently copied to the clipboard for sharing elsewhere.

PermaLinkr is designed to allow you to share a link to a specific section in a large document, given that the document is annotated enough with `ID` hooks. It was created after I had to go into the Web Inspector one time too many just to link to a specific heading in a long document on <a href="https://developer.mozilla.org/"><abbr title="Mozilla Developer Network">MDN</abbr></a>, but it can be used many other sites.

<a href="https://chrome.google.com/webstore/detail/permalinkr/nhblbgdabkonkbecpnnbdjnbkkbfhkfe"><img src="https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png" alt="Available in the Chrome Web Store" /></a>