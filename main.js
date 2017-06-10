const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win

function createWindow () {
	win = new BrowserWindow({width: 1280, height: 720, frame: false,
		backgroundColor: '#222222', minWidth: 515, minHeight: 350});

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	win.webContents.openDevTools({'mode': 'detach'});

	win.on('closed', () => {
		win = null
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
});
