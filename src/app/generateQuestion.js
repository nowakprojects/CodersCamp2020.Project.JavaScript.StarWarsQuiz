import {peopleIdArray, starshipsIdArray, vehiclesIdArray} from './settings.js';
import {getRandomIdFromArray} from './util.js';

export const generateQuestion = (mode) => {
	let questionsIdArray = [];
	let rightAnswerId;
	const result = {
	  image: "",
	  answers: [],
	  rightAnswer: "",
	};

	switch(mode) {
		case 'people' : 
			questionsIdArray = getRandomIdFromArray(peopleIdArray);
			break;
		case 'starships' : 
			questionsIdArray =  getRandomIdFromArray(starshipsIdArray);
			break;
		
		case 'vehicles' : 
			questionsIdArray =  getRandomIdFromArray(vehiclesIdArray);
			break;
	}

	rightAnswerId =  questionsIdArray[Math.floor(Math.random() * questionsIdArray.length)];
  
	questionsIdArray.forEach((id) => {
	  const url = `https://swapi.dev/api/${mode}/${id}/`;
	  fetch(url)
		.then((response) => {
		  if (response.status !== 200) {
			throw Error("Bład 200");
		  } else {
			return response.json();
		  }
		})
		.then((json) => {
	
		  result.answers.push(json.name);
  
		  if (rightAnswerId == id) {
			result.image = btoa(`static/assets/img/modes/${mode}/${id}.jpg`);
			result.rightAnswer = json.name;
		  }
		})
		.catch((err) => console.log(err));
	});
  
	return result;
  };