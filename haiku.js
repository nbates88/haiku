var fs = require('fs');

module.exports = {
	createHaiku: createHaiku,
};

var dictionaryObject = {};

function createHaiku(structure){
	console.log("Creating Haiku for structure:", structure)
   for(var i = 0; i <structure.length; i++){
   	var line = structure[i];
   	console.log(generateWordsforLine(line));
   }
}

function generateWordsforLine(line){
	var lineArray = [];
	for(var j = 0; j <line.length; j++){
		var numSyll = line[j];
    var randomWord = getRandomWord(numSyll);
		lineArray.push(randomWord.word);
	}	
	return lineArray.join(" ");
};

function getRandomWord(numSyll){
  var randomWord;

  var possibleWords = dictionaryObject[numSyll];
  var randomIndex = getRandomInt(0, possibleWords.length);

  randomWord = possibleWords[randomIndex];

  return randomWord;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){   
   var lines = data.split("\n"),
       lineSplit
  lines.forEach(function(line){    
    processLine(line);
  });   
}

function processLine(line) {
  lineSplit = line.split("  "); 
  var word = lineSplit[0]   
  var phoneme = lineSplit[1];
  if(phoneme == undefined){
    return;
  }
  var key = numSyllables(phoneme);
  var entry = {
    word: word, 
    phoneme: phoneme
  };

  var entryArray = dictionaryObject[key]
  if(entryArray == undefined){
    dictionaryObject[key] = [entry];
  }else{
    entryArray.push(entry);
  }
}

console.log("Creating word map...");

formatData(cmudictFile);

function numSyllables(phoneme){
	var syllableCount = 0;
	var phonemeArray = phoneme.split(" ");
	for(var i = 0; i < phonemeArray.length; i++){
		if(isSyllable(phonemeArray[i]) == true){
			syllableCount++;
		}
	}

	return syllableCount;
};

function isSyllable(string){
	var lastCharacter = string.charAt(string.length-1);
	var syllableFound =!isNaN(parseInt(lastCharacter));
	return syllableFound;
};