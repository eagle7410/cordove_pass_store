import {save, move, update, reqFull, get} from '../utils/Req'
import Routes from '../const/apiRoutes'
/**
 * @type {BrowerDataBaseClass|*}
 */
const db = function () {
	return window.cordova.db;
};
const getPath           = data => reqFull(get, Routes.cloudGetPath, data);
const setConfigFile     = async data => {
	/**
	 * @type {BrowerDataBaseClass|*}
	 */
	let connect = db();
	let table = 'settings';

	let doc = await connect.getByRequire(table, 'type', data.type);

	let sett = JSON.parse(doc.data);

	sett.config = data.config;
	sett.isHaveConfig = true;

	await connect.updateByPk(table, doc.id, {data : JSON.stringify(sett)});
};

const postArchive       = data => reqFull(save, Routes.cloudUploadArchive, data);
const getArchive        = data => reqFull(get, Routes.cloudDownloadArchive, data);
const putCloudArchive   = data => reqFull(update, Routes.cloudUpload, data);
const extractArchive    = date => reqFull(update, Routes.cloudDownloadArchiveExtract, date);
const mergeArchive      = date => reqFull(save, Routes.cloudDownloadArchiveMerge, date);
const clearArchive      = date => reqFull(move, Routes.cloudDownloadArchiveClear, date);

export {
	getPath,
	setConfigFile,
	postArchive,
	putCloudArchive,
	getArchive,
	extractArchive,
	mergeArchive,
	clearArchive,
};
