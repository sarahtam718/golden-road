import React, { Component } from 'react';
import plantData from './plantData.json';
//import Moment from 'react-moment';
import moment from 'moment';
import PlantCard from './PlantCard';

// Empty global array to fill with dates to water each plant
const startDate = '2019-12-16 09';
let dateArr = [];

export default class PlantMath extends Component {
  componentDidMount = () => {
    // I want this function to run basically right away
    this.wateringFrequency();

    // trying to group by date (more user-friendly)
    for (let k = 0; k < dateArr.length; k++) {
      const element = dateArr[k].dateToWater;
      // I want to group plants based on date, so may need some kind of comparison...
      // if date1 = date2, then push plant name into date 1?
      // console.log(element);
    }
  };

  // for each plant, how many times will a Tandelorian have to water during the 12 weeks?
  wateringFrequency = () => {
    // console.log(plantData);
    const numOfDays = 12 * 7;

    // for each plant...
    for (let i = 0; i < plantData.length; i++) {
      // separate plan name to keep things simple
      let name = plantData[i].name;
      // get rid of "days" so we just have the number
      let waterFreq = plantData[i].water_after.split(' ')[0];
      //console.log(name, waterFreq);
      // take the total number of days to water and divide by the frequency
      let numOfWaterings = numOfDays / waterFreq;

      // for each opportunity to water...
      for (let j = 0; j <= numOfWaterings; j++) {
        const wateringsNum = waterFreq * j;
        // console.log('watering in days', wateringsNum);
        // for each iteration of wateringsNum, add that number of days to startDate
        let dateToWater = moment(startDate)
          .add(`${wateringsNum}`, 'days')
          .format('dddd, MMMM Do YYYY');

        // we have start & end date, but what about weekends?
        if (dateToWater.includes('Saturday')) {
          let newDate = moment(startDate)
            .add(`${wateringsNum - 1}`, 'days')
            .format('dddd, MMMM Do YYYY');
          dateArr.push({ name: name, dateToWater: newDate });
        } else if (dateToWater.includes('Sunday')) {
          let newDate = moment(startDate)
            .add(`${wateringsNum + 1}`, 'days')
            .format('dddd, MMMM Do YYYY');
          dateArr.push({ name: name, dateToWater: newDate });
        } else {
          dateArr.push({ name: name, dateToWater: dateToWater });
        }
        // console.log('watering in calendar days??!!!', dateToWater);
      }
    }
    //console.log('dateArray', dateArr);
  };

  render() {
    return <PlantCard />;
  }
}
