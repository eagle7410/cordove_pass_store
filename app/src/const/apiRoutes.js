const cloud = 'cloud';
const upload = `${cloud}-upload`;
const Routes = {
	appInit   : 'app-init',
	auth      : 'auth',
	cat       : 'category',
	usr       : 'user',
	store     : 'storage',
	cloudUpload        : upload,
	cloudUploadArchive : `${upload}-create-archive`,
};

module.exports = Routes;
