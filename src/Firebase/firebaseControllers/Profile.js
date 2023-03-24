import {db} from '../firebase'

const getProfile =  async() => {
  // const snapshot = await db.collection('timelines').get();
  const snapshot = await db.collection('users').get();
  


//   console.log(doc.id, ' => ', "output:",doc.data());
  // return snapshot.docs.map(doc => doc.data());
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));







  
}

export default getProfile;

