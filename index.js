'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');

var Menu = require('menu');
// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

function createMainWindow () {
	const win = new BrowserWindow({
		'min-width': 800,
		'min-height': 600,
		resizable: true
	});

	win.loadUrl(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

// prevent window being GC'd
let mainWindow;

function onClosed() {
	// deref the window
	// for multiple windows store them in an array
	mainWindow = null;
}

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', function () {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', function () {

	var template = [
	  {
	    label: 'Elite Log Searcher',
	    submenu: [
	      {
	        label: 'About Elite Log Searcher',
	        selector: 'orderFrontStandardAboutPanel:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Services',
	        submenu: []
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Hide Elite Log Searcher',
	        accelerator: 'Command+H',
	        selector: 'hide:'
	      },
	      {
	        label: 'Hide Others',
	        accelerator: 'Command+Shift+H',
	        selector: 'hideOtherApplications:'
	      },
	      {
	        label: 'Show All',
	        selector: 'unhideAllApplications:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Quit',
	        accelerator: 'Command+Q',
	        click: function() { app.quit(); }
	      },
	    ]
	  },
	  {
	    label: 'Edit',
	    submenu: [
	      {
	        label: 'Undo',
	        accelerator: 'Command+Z',
	        selector: 'undo:'
	      },
	      {
	        label: 'Redo',
	        accelerator: 'Shift+Command+Z',
	        selector: 'redo:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Cut',
	        accelerator: 'Command+X',
	        selector: 'cut:'
	      },
	      {
	        label: 'Copy',
	        accelerator: 'Command+C',
	        selector: 'copy:'
	      },
	      {
	        label: 'Paste',
	        accelerator: 'Command+V',
	        selector: 'paste:'
	      },
	      {
	        label: 'Select All',
	        accelerator: 'Command+A',
	        selector: 'selectAll:'
	      },
	    ]
	  },
	  {
	    label: 'View',
	    submenu: [
	      {
	        label: 'Reload',
	        accelerator: 'Command+R',
	        click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); }
	      },
	      {
	        label: 'Toggle DevTools',
	        accelerator: 'Alt+Command+I',
	        click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
	      },
	    ]
	  },
	  {
	    label: 'Window',
	    submenu: [
	      {
	        label: 'Minimize',
	        accelerator: 'Command+M',
	        selector: 'performMiniaturize:'
	      },
	      {
	        label: 'Close',
	        accelerator: 'Command+W',
	        selector: 'performClose:'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Bring All to Front',
	        selector: 'arrangeInFront:'
	      },
	    ]
	  },
	  {
	    label: 'Help',
	    submenu: []
	  },
	];

	var menu = new Menu();
	menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

	mainWindow = createMainWindow();
});
