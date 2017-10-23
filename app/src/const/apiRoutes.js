const cloud = 'cloud';
const upload = `${cloud}-upload`;
const Routes = {
	appInit   : 'app-init',
	auth      : 'auth',
	cloudUpload        : upload,
	cloudUploadArchive : `${upload}-create-archive`,
};

module.exports = Routes;
