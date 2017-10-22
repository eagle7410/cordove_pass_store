import {save, move, update, reqFull, get} from '../utils/Req'
import Routes from '../const/apiRoutes'
import AlertStatus from '../const/AlertStatus'
import {fullData} from './Loader'

/**
 * @type {BrowerDataBaseClass|*}
 */
const db = function () {
	return window.cordova.db;
};


const postArchive       = data => reqFull(save, Routes.cloudUploadArchive, data);

const putCloudArchive   = data => reqFull(update, Routes.cloudUpload, data);

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
		state.showAlert('Fail load data file.', AlertStatus.BAD);
	}
};

const migrateData = async (state, data) => {
	try {
		/**
		 * @type {BrowerDataBaseClass|*}
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
				await database.insert('storage', ['login', 'pass'], [user.login, user.pass])
			}

		}

		for(let record of  data.store) {
			let rec = await database.getByRequire('storage', 'title', record.title);

			if (rec) {
				for(let prop in  record) {
					if (prop === 'id') continue;

					rec[prop] = record[prop];
				}

				await database.updateByPk('storage', rec.id, record.title);
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
		state.showAlert('Fail load data file.', AlertStatus.BAD);
	}

};
const extractArchiveAndMigrate = async (state, binary) => {
	try {
		let zipper = new window.JSZip();

		let zip = await zipper.loadAsync(binary);
		let file = zip.file('data.json');

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
		state.showAlert('Fail load data file.', AlertStatus.BAD);
	}

};

export {
	extractArchiveAndMigrate,
	postArchive,
	putCloudArchive,
};
