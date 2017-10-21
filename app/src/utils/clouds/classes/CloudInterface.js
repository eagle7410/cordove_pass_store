export default class CouldInterface {

	constructor() {
		const that = this;

		that._statuses = {
			create        : 1,
			noAccessToken : 2,
			initBad       : 3,
			initOk        : 4
		};

		that._status = this._statuses.create;
		that._config = null;
		that.cloudFileName = null;
	}

	setConfig (config) {
		this._config = config;
	}
	/**
	 * Init connect.
	 */
	connectInit () {}

	/**
	 *
	 * @param content {string}
	 * @param fileName {string}
	 */
	moveToCould (content, fileName) {}

	/**
	 *
	 * @param folder {string}
	 * @param fileName {string}
	 */
	moveFromCould (folder, fileName)  {}

	/**
	 *
	 * @returns {boolean}
	 */
	isHaveConfig () {
		return this._config === null;
	}
	/**
	 *
	 * @param fileName {string}
	 */
	deleteInCould(fileName) {}

	getStatus() {
		return this._status;
	}

	getStatuses() {
		return this._statuses;
	}


	/**
	 *
	 * @param fileName {string}
	 */
	setCloudFileName(fileName) {
		this.cloudFileName = fileName;
	}

}
