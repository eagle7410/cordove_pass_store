import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

let app;

class Firebase {

	static isErrorAboutDuplicationApp(e) {
		return e && e.code && e.code === 'app/duplicate-app';
	}

	static authUser(config, email, password) {
		return new Promise((ok, bad) => {
			try {
				app = firebase.initializeApp(config)
			} catch (e) {
				if (!this.isErrorAboutDuplicationApp(e))
					return bad(e);
			}

			app.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
				if (error) return bad(`Error code: ${error.code}, message: ${error.message}`)
			});

			app.auth().onAuthStateChanged(user => {
				if (!user) return bad('User not found');
				if (user.isAnonymous) return bad('Bad user authorization in firebase');
				ok(user);
			})
		})
	}

	static async getCollection(name) {
		const query = app.database().ref(name);

		const snap = await query.once('value');

		return snap.val();
	}

	static async setNew(name, key, data) {
		const query = firebase.database().ref(name);

		return await query.child(key).set(data);
	}

	static async addNew(name, data) {
		const query = firebase.database().ref(name);

		return await query.push(data);
	}

	static async setCollection(name, data) {
		return await firebase.database().ref(name).set(data);
	}

	static async getData() {
		const store = await this.getCollection('store');
		const categories = await this.getCollection('categories');

		return {
			store,
			categories
		};
	}
}

export default Firebase
