import {db} from '../firebase'

const getImages =  async() => {
  // const snapshot = await db.collection('timelines').get();
  const snapshot = await db.collection('images').get();

//   console.log(doc.id, ' => ', "output:",doc.data());
  return snapshot.docs.map(doc => doc.data());

}

export default getImages;

