import {db} from '../firebase'




// const db = firebase.firestore();

// // Assuming your collection name is "myCollection"
// const query = db.collection('myCollection').orderBy('createdAt', 'desc').limit(5);

// // Execute the query and get the latest 5 documents
// query.get().then((querySnapshot) => {
//   const latestData = querySnapshot.docs.map((doc) => doc.data());
//   // latestData will contain an array of the latest 5 documents
// });

const getPatients =  async() => {
  const snapshot = await db.collection('patient').get();
  // const snapshot = await db.collection('patients').get();
  // const snapshot = await db.collection('patients').orderBy('createdAt', 'desc').limit(5).get();

//   console.log(doc.id, ' => ', "output:",doc.data());
  return snapshot.docs.map(doc => doc.data());

}

export default getPatients;

