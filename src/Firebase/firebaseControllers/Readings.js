import {db} from '../firebase'

const getReadings =  async() => {
  const snapshot = await db.collection('readings').get();

//   console.log(doc.id, ' => ', "output:",doc.data());
  return snapshot.docs.map(doc => doc.data());

}

export default getReadings;

