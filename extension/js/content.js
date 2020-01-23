console.log('content.js');

// load the main module
(async () => await import(chrome.extension.getURL('js/module.js')))();