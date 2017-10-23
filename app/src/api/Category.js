/**
 * @type {BrowserDataBaseClass}
 */
const db = function () {
	return window.cordova.db;
};

const table = 'categories';

const add  = async name => {
	/**
	 * @type {BrowserDataBaseClass|*}
	 */
	let database = db();

	await database.insert(table, ['name'], [name]);

	let ins = await database.getByRequire('categories', 'name', name);

	return ins;

};

const del  = async id => {
	await db().removeByPk(table, Number(id));
	return true;
};

const edit = async (id, name) => {
	await db().updateByPk(table, Number(id), {id : id, name : name});
	return true;
};

export {add, del, edit};
