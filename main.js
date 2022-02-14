console.log("CJ Ho's JavaScript Assessment");

//Task 1: Create global variables and import prompt input from package
// set up the prompt for synchronisation
const prompt = require('prompt-sync')({sigint: true});
// load the clear screen function
const clear = require('clear-screen');


// create a simple hat block for each column
const hat = '^';
const hole = 'o';
const fieldCharacter = '░';
const pathCharacter = '*';

//Task 2: Create Field Class with constructor for the game
// "class" representing a field in the game
class Field {
  // initialize the fields
  constructor(field) {
    // define the field
    this.field = field;

    // reset x and y to 0
    this.locationX = 0;
    this.locationY = 0;
  };


  // generates a field of random width and height
  //"static" method or property for a class
  static generateField(height, width,) {

    // create new array of characters
    let newField = [];
    // build the new field array
    for (let i = 0; i < height; i++) {
      newField.push([])
      for (let j = 0; j < width; j++) {
        newField[i].push(fieldCharacter)
      }
    }

    // generate a new field for each hole
    // fill the hole in the new field
    for (let k = 1; k < height; k++) {
      let hole = Math.floor(Math.random() * width);
      newField[k][hole] = hole;
    }

    // add new hat to the field
    let hat = Math.floor(Math.random() * width)
    newField[width-1][hat] = hat;

    // return the new field object
    return newField;
  }

  //Task 4: Create runGame, print, askQuestion Methods for the game
  // run the game of to find the hat
  runGame() {
    let continueGame = true
    // continue the game until it's over
    while (continueGame === true) {
      switch(this.field[this.locationY][this.locationX]) {
        case fieldCharacter:
          // set the pathCharacter
          this.field[this.locationY][this.locationX] = pathCharacter;
          // print the field to the console
          this.print(this.field);
          // ask the user where to move next
          this.askQuestion()
          break;
        case hole:
          console.log('Darn!! You fell into a hole!');
          continueGame = false;
          break;
        case hat:
          console.log('Well Done!!! You found your hat!');
          continueGame = false;
          break;
        case undefined:
          console.log('Game Over!!!! You fell over the edge!')
          continueGame = false;
      }
    }
  };

  // prints the field values to the console
  print() {

    // loop through each field and print it
    for (let i = 0; i < this.field.length; i++) {
      // concatenate and print the elements in an array
      console.log(this.field[i].join(''));
    }
  };

  // move the character in the field
  askQuestion() {
    // prompt the user to choose the direction
    const answer = prompt('Where do you want to move? (w = up, s = down, a = left, d = right Press Enter to move)');

    // switch the direction of the field
    this.field[this.locationY][this.locationX] = fieldCharacter;
    // update location y
    // update location x
    switch(answer) {
      // up
      case 'w':
        this.locationY -= 1;
        break;
      // down
      case 's':
        this.locationY += 1;
        break;
      // left
      case 'a':
        this.locationX -= 1;
        break;
      // right
      case 'd':
        this.locationX += 1;
    }
  };

}// end of Class

//Task 5: Instantiate Field Class to initialise constructor and generate rows and columns from the generateField Method. Call runGame Method to run the game

// generate a random field in the form
const randomField = Field.generateField(10,10)
// create a random field
const myField = new Field(randomField)
// run the field game
myField.runGame()
