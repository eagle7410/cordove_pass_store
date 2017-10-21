import {Auth} from '../const/Messages'
import CryptoJS from 'crypto-js';

/**
 * @type {BrowerDataBaseClass|*}
 */
const db = function () {
	return window.cordova.db;
};

const loginList = async ()  => {
	let list = await db().getAll('users');

	return list;

};


const auth = async (login, pass) => {

	let hash = CryptoJS.HmacSHA256(pass, "IgorStcherbina");

	let user = await db().getByRequire('users','login', login);

	if (!user || user.pass !== hash.toString(CryptoJS.enc.Hex)) {
		throw new Error(Auth.passBad);
	}

	return `${login}token`;

};

export {loginList, auth};
