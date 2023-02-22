import {db} from '../firebase'

const getPatients =  async() => {
  const snapshot = await db.collection('patients').get();

//   console.log(doc.id, ' => ', "output:",doc.data());
  return snapshot.docs.map(doc => doc.data());

}

export default getPatients;

