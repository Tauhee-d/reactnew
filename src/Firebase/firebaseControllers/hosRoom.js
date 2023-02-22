import {db} from '../firebase'

const getRooms =  async() => {
  const snapshot = await db.collection('rooms').get();

//   console.log(doc.id, ' => ', "output:",doc.data());
  return snapshot.docs.map(doc => doc.data());

}

export default getRooms;

