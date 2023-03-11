import {db} from '../firebase'

const getTimeline =  async() => {
  // const snapshot = await db.collection('timelines').get();
  const snapshot = await db.collection('timeline').get();

//   console.log(doc.id, ' => ', "output:",doc.data());
  return snapshot.docs.map(doc => doc.data());

}

export default getTimeline;

