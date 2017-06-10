const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;
let loading;

function createWindow () {
	loading = new BrowserWindow({width: 200, height: 250, frame: false,
		backgroundColor: '#00674d', resizable: false, center: true});
	loading.loadURL(url.format({
		pathname: path.join(__dirname, 'loading.html'),
		protocol: 'file:',
		slashes: true
	}));

	setTimeout(function() {
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
		loading.close();
	}, 3000);
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
