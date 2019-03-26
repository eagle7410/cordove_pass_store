import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

let app
class Firebase {

  static authUser (config, email, password) {
    console.log(config, email, password)
    app = firebase.initializeApp(config)
    return new Promise((ok, bad) => {
      app.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        if (error) return bad(`Error code: ${error.code}, message: ${error.message}`)
      })
      app.auth().onAuthStateChanged(ok)
    })
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
