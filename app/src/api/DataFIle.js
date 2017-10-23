import {save, move, update, reqFull, get} from '../utils/Req'
import Routes from '../const/apiRoutes'
import AlertStatus from '../const/AlertStatus'
import {fullData} from './Loader'
import FileSaver from 'file-saver'

/**
 * @type {BrowserDataBaseClass|*}
 */
const db = function () {
	return window.cordova.db;
};

const fileJson = 'data.json';

const postArchive       = data => reqFull(save, Routes.cloudUploadArchive, data);

const putCloudArchive   = data => reqFull(update, Routes.cloudUpload, data);

const uploadBinary = async (state, binary) => {
	let fileZip = fileJson + '.zip';
	alert('before save');

	if (window.resolveLocalFileSystemURL) {
		alert('use resolveLocalFileSystemURL');
		window.resolveLocalFileSystemURL(window.cordova.file.documentsDirectory,
			function(dirEntry) {
			/* global dir */
				dir.getFile(fileZip, {
						create: true,
						exclusive: false
					}, function (f) {
						f.createWriter(function (writer) {
								writer.onwriteend = function (evt) {
									alert("File successfully created!");
								};
								writer.write(binary);
							},
							function (evt, where) {
								console.log("Error writing file " + where + " :");
								console.log(JSON.stringify(evt));
							})
					},
					function (evt, where) {
						console.log("Error resolving data folder " + where + " :");
						console.log(JSON.stringify(evt));
					}
				)
			}
		);
	} else {
			let blob = new Blob([binary], {'type': 'application/octet-stream' });
			let url = window.URL.createObjectURL(blob);

		let a = document.createElement('a');
		a.href = url;
		a.download = fileZip;
		a.click();
		alert('GG');
		// document.location = 'data:Application/octet-stream,' + encodeURIComponent(binary);
	}

	state.next();
};

const getDataJsonFile = async (state) => {
	try {
		/**
		 * @type {BrowserDataBaseClass|*}
		 */
		let database = db();

		let users = await database.getAll('users');
		let store = await database.getAll('storage');
		let categories = await database.getAll('categories');

		let data = {
			users : users,
			store : store,
			categories : categories
		};

		let zipper = new window.JSZip();

		let zip = await zipper.file(fileJson, JSON.stringify(data));

		let blob = await  zip.generateAsync({type:"blob"});
		alert('COllect');
		uploadBinary(state, blob);

		state.next();

	} catch (err) {
		console.log('err ', err);
		state.stop();
		state.showAlert((err.message || (err.target && err.target.error.message ) || err), AlertStatus.BAD);
	}
}

const updateApp   = async (state) => {
	try {
		let mergedData = await fullData();

		['Categories', 'Users', 'Storage'].forEach(
			p => state[`init${p}`](mergedData[p.toLowerCase()])
		);

		state.next();
		state.showAlert('Migrate data from json file is success :)', AlertStatus.OK);
	} catch (err) {
		console.log('err ', err);
		state.stop();
		state.showAlert((err.message || (err.target && err.target.error.message ) || err), AlertStatus.BAD);
	}
};

const migrateData = async (state, data) => {
	try {
		/**
		 * @type {BrowserDataBaseClass|*}
		 */
		let database = db();

		for(let catId in  data.categories) {
			catId = Number(catId);

			let cat = await database.getByPk('categories', catId);

			if (!cat) {
				await database.insert('categories', ['id', 'name'], [catId, data.categories[catId] ]);
			}
		}

		for(let user of  data.users) {
			let us = await database.getByRequire('users', 'login', user.login);

			if (!us) {
				await database.insert('users', ['login', 'pass'], [user.login, user.pass])
			}

		}

		for(let record of  data.store) {
			let rec = await database.getByRequire('storage', 'title', record.title);

			if (rec) {
				for(let prop in  record) {
					if (prop === 'id') continue;

					rec[prop] = record[prop];
				}

				await database.updateByPk('storage', rec.id, rec);
			} else {
				await database.insert(
					'storage',
					[ 'title', 'category', 'login', 'pass', 'answer', 'desc'],
					[
						record.title,
						record.category,
						record.login,
						record.pass,
						record.answer,
						record.desc
					]
				);
			}
		}

		updateApp(state);

		state.next();

	} catch (err) {
		console.log('err ', err);
		state.stop();
		state.showAlert((err.message || (err.target && err.target.error.message ) || err), AlertStatus.BAD);
	}

};

const extractArchiveAndMigrate = async (state, binary) => {
	try {
		let zipper = new window.JSZip();

		let zip = await zipper.loadAsync(binary);
		let file = zip.file(fileJson);

		if (!file) {
			throw new Error('Archive No have data.json file')
		}

		let text = await file.async("string");

		if (!text) {
			throw new Error('Data in data.json is empty');
		}

		let data = JSON.parse(text);

		migrateData(state, data);

		state.next();

	} catch (err) {
		console.log('err ', err);
		state.stop();
		state.showAlert((err.message || (err.target && err.target.error.message ) || err), AlertStatus.BAD);
	}

};

export {
	extractArchiveAndMigrate,
	getDataJsonFile,
	postArchive,
	putCloudArchive,
};
