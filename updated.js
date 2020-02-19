var moment = require('moment');

const plantData = [
  {
    name: 'Fiddle Leaf Fig',
    water_after: '7 days'
  },
  {
    name: 'Snake Plant',
    water_after: '14 days'
  },
  {
    name: 'Money Tree',
    water_after: '14 days'
  },
  {
    name: "Bird's Nest Fern",
    water_after: '3 days'
  },
  {
    name: 'Croton',
    water_after: '7 days'
  },
  {
    name: 'Bell Pepper Plant',
    water_after: '3 days'
  },
  {
    name: 'Strawberry Plant',
    water_after: '3 days'
  },
  {
    name: 'Dracaena',
    water_after: '14 days'
  },
  {
    name: 'Spider Plant',
    water_after: '7 days'
  },
  {
    name: 'Jade',
    water_after: '14 days'
  },
  {
    name: 'Wavy Fern',
    water_after: '2 days'
  }
];

// <future dev> the start date could definitely be dynamically pulled from a form
const startDate = '2019-12-16 09';
// Empty array to store with the plant name & dates to water each plant
let plantArr = [];

// for each plant, how many times will we have to water during the 12 weeks?
wateringFrequency = () => {
  // console.log(plantData);
  const numOfDays = 12 * 7;

  // for each plant...
  for (let i = 0; i < plantData.length; i++) {
    // separate plan name to keep things simple
    let name = plantData[i].name;
    let waterFreq = plantData[i].water_after.split(' ')[0];
    //console.log(name, waterFreq);
    // take the total number of days to water and divide by the frequency
    let numOfWaterings = numOfDays / waterFreq;
    let datesArr = [];

    // for each opportunity to water...
    for (let j = 0; j <= numOfWaterings; j++) {
      const wateringsNum = waterFreq * j;
      // console.log('watering in days', wateringsNum);
      // for each iteration of wateringsNum, add that number of days to startDate
      let dateToWater = moment(startDate)
        .add(`${wateringsNum}`, 'days')
        .format('dddd, MMMM Do YYYY');
      // console.log(name, dateToWater);
      // datesArr.push(dateToWater);

      //  we have start & end date, but what about weekends?
      if (dateToWater.includes('Saturday')) {
        let newDate = moment(startDate)
          .add(`${wateringsNum - 1}`, 'days')
          .format('dddd, MMMM Do YYYY');
        datesArr.push(newDate);
      } else if (dateToWater.includes('Sunday')) {
        let newDate = moment(startDate)
          .add(`${wateringsNum + 1}`, 'days')
          .format('dddd, MMMM Do YYYY');
        datesArr.push(newDate);
      } else {
        datesArr.push(dateToWater);
      }
    }
    // console.log(datesArr);
    // pushing an object with the plant name and dates for watering together
    plantArr.push({ name: name, dates: [datesArr] });
  }

  // map each plant to see all the data
  for (let k = 0; k < plantArr.length; k++) {
    console.log('name: ', plantArr[k].name);
    console.log('dates to water: ', plantArr[k].dates);
  }
};

wateringFrequency();

// console.log('plantArr: ', plantArr);
