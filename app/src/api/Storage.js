
const table = 'storage';
/**
 * @type {BrowserDataBaseClass}
 */
const db = function () {
	return window.cordova.db;
};

const edit = async data => {
	await db().upInsert(table, data);

	return true;
};

const del = async id => {
	await db().removeByPk(table, Number(id));

	return true;
};

const addRecord = async data => {
	let database = db();

	await database.upInsert(table, data);

	let newData = await database.getByRequire(table, 'title', data.title);

	return newData;
};

export {addRecord, edit, del};
