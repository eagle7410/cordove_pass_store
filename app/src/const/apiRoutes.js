const cloud = 'cloud';
const connect = `${cloud}-connect`;
const upload = `${cloud}-upload`;
const download = `${cloud}-download-archive`;
const Routes = {
	appInit   : 'app-init',
	auth      : 'auth',
	cat       : 'category',
	usr       : 'user',
	usrList   : 'users-list',
	sdfPath   : 'sdf-path',
	sdfLoad   : 'sdf-load',
	store     : 'storage',
	cloudUpload        : upload,
	cloudUploadArchive : `${upload}-create-archive`,
	cloudDownloadArchive        : download,
	cloudDownloadArchiveExtract : `${download}-extract`,
	cloudDownloadArchiveMerge   : `${download}-merge`,
	cloudDownloadArchiveClear   : `${download}-clear`,
	cloudGetPath    : `${connect}-path`,
	cloudSaveConfig : `${cloud}-config`,
	cloudInit       : `${connect}-init`,
};

module.exports = Routes;
