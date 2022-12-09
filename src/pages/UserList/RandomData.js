export const dict = [];
// user list
const mail_list = [
  "adam@gmail.com",
  "issac@gmail.com",
  "tim@gmail.com",
  "greeny@gmail.com",
  "eggy@gmail.com",
];

// get date value in millis
const randomDate = function () {
  const endDate = new Date().getTime();
  const startDate = new Date("2022", "07", "01").getTime();
  return Math.floor(Math.random() * (endDate - startDate) + startDate);
};

// get temp value
const randomTemp = function () {
  return (Math.random() * (450 - 200) + 200) / 10;
};

// get battery value
const randomBattery = function () {
  return Math.floor(Math.random() * 100) + "%";
};

//date formatting function
function dateFormat(inputDate) {
  const date = new Date(inputDate);
  // console.log(date)
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return (
    year.toString() +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0")
  );
}

function getMillis(inputDate) {
  const date = new Date(inputDate);
  // console.log(date)
  // console.log(date.getTime())
  return date.getTime();
}

for (let i = 0; i < 1000; i++) {
  const readingDate = randomDate();
  const email = mail_list[Math.floor(Math.random() * mail_list.length)];
  const dummy = {
    _id: email.split("@")[0] + readingDate,
    email: email,
    name: email.split("@")[0],
    deviceName: "VTack",
    deviceId: "12345678",
    temperature: randomTemp().toFixed(1),
    timestamp: readingDate,
    battery: randomBattery(),
    date: dateFormat(readingDate),
    sync: "yes",
  };
  dict.push(dummy);
}
console.log(dict);
