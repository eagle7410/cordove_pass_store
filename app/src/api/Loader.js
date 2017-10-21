/**
 * @type {BrowerDataBaseClass|*}
 */

const fullData = async () => {

	const db = window.cordova.db;

	const users = await db.getAll('users');

	const categories = await db.getAll('categories');
	let dataCat = {};
	categories.map(cat => dataCat[cat.id] = cat.name);

	const storage = await db.getAll('storage');

	const settings = await db.getAll('settings');
	let dataSett = {};
	settings.map(sett => dataSett[sett.type] = JSON.parse(sett.data));

	return {
		categories : dataCat,
		settings : dataSett,
		storage : storage,
		users : users
	}
};

export {fullData};
