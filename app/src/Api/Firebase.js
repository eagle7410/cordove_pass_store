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

			app.auth().onAuthStateChanged(ok)
		})
	}

	static async getCollection(name) {
		const query = app.database().ref(name);

		const snap = await query.once('value');

		return snap.val();
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

//
// 	<script>
// 		console.log('Run script');
//
// 		firebase.initializeApp(config);
//
// 		const setToCollection = async (collection, data) => {
// 			return await firebase.database().ref(collection).set(data);
// 		}
//
// 		const addNew = async (collection, data) => {
// 			console.log(`Get collection: ${collection}`);
// 			const query = firebase.database().ref(collection);
//
// 			return await query.push(data);
// 		}
//
// 		const getAllFrom = async (collection) => {
// 			console.log(`Get collection: ${collection}`);
//
// 			const query = firebase.database().ref(collection);
//
// 			const snap = await query.once('value');
//
// 			return snap.val();
// 		};
//
// 		firebase.auth().onAuthStateChanged(async (userAuth) => {
//
// 			try {
// 				if (!userAuth)
// 					throw new Error('Not found user');
//
// 				// User is signed in.
// 				// TODO: clear
// 				console.log(`isAnonymous: ${userAuth.isAnonymous}, user uid ${userAuth.uid}`);
//
// 				const collection = 'users';
//
// 				let users = await getAllFrom(collection);
//
// 				console.log('Users is ', users);
//
// 				let newUser = await addNew(collection, {name : 'igor3'})
// 				console.log('New user is ', newUser);
//
// 				users = await getAllFrom(collection);
//
// 				console.log('Users is ', users);
//
// 				await setToCollection(collection, {
// 					0: users[0],
// 					1: users[1],
// 				});
//
// 				users = await getAllFrom(collection);
// 				console.log('Users is ', users);
// 			} catch (e) {
// 				console.error(e);
// 			}
// 		});
// 	</script><
