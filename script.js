//Global variables that are used as the location for the cards
const startover = document.getElementById('startover');
const freshCard = document.getElementById('new');
const addCard = document.getElementById('addCard');
const planning = document.getElementById('planning');
const inProgress = document.getElementById('inprogress');
const testing = document.getElementById('testing');
const completed = document.getElementById('completed');
const save = document.getElementById('savecard');
const cardTracker = []; //tracks how many cards are on board and stores then into an array

class CreateCard {
  //class that is used as the blueprint in making each card
  constructor() {
    this.createdCard = document.createElement('Div');
    this.moveBack = document.createElement('button');
    this.text = document.createElement('textArea');
    this.moveForward = document.createElement('button');
    this.remove = document.createElement('button');
    this.card = document.getElementById('innercard'); //Reading the innercard id
    this.count = 0; //Creates a count unique to each object created from this class
    this.location = freshCard; //probably not needed but helped me visilize the location a bit
  }

  assignValues() {
    //assigns the div and other elements a id and class toggle
    this.createdCard.id = 'innercard';
    this.moveBack.id = 'back';
    this.moveForward.id = 'forward';
    this.text.innerText = '';
    this.moveForward.classList.toggle('forwardbtn');
    this.moveBack.classList.toggle('backbtn');
    this.remove.classList.toggle('rmbtn');
  }
  appendDiv() {
    //appends the data when called
    this.location.appendChild(this.createdCard); //Parent node DIV
    this.createdCard.appendChild(this.text);
    this.createdCard.appendChild(this.moveForward).innerText = 'Forward';
    this.createdCard.appendChild(this.moveBack).innerText = 'Backward';
    this.createdCard.appendChild(this.remove).innerText = 'Delete';
  }
  removeElement() {
    //A method that removes the div that is selected
    this.createdCard.remove();
  }
}

const addCards = () => {
  let addedCard = new CreateCard(); //each click creates new div or object in the DOM
  addedCard.assignValues();
  addedCard.appendDiv();

  //creates var that pull from the class making the code more readable and maintainable
  const forward = addedCard.moveForward;
  const back = addedCard.moveBack;
  const rmcard = addedCard.remove;

  //onclick removes the card element using the createCard method RemoveElement()
  rmcard.addEventListener('click', () => {
    addedCard.removeElement();
  });

  //event for moving div forward
  forward.addEventListener('click', () => {
    switch (addedCard.count) {
      case 0:
        planning.appendChild(addedCard.createdCard);
        addedCard.count++;
        break;
      case 1:
        inProgress.appendChild(addedCard.createdCard);
        addedCard.count++;
        break;
      case 2:
        testing.appendChild(addedCard.createdCard);
        addedCard.count++;
        break;
      case 3:
        completed.appendChild(addedCard.createdCard);
        addedCard.count++;
        break;
      default:
        alert('Cannot move this card forward anymore');
    }
  });
  //event to move div back
  back.addEventListener('click', () => {
    switch (addedCard.count) {
      case 1:
        freshCard.appendChild(addedCard.createdCard);
        addedCard.count--;
        break;
      case 2:
        planning.appendChild(addedCard.createdCard);
        addedCard.count--;
        break;
      case 3:
        inProgress.appendChild(addedCard.createdCard);
        addedCard.count--;
        break;
      case 4:
        testing.appendChild(addedCard.createdCard);
        addedCard.count--;
        break;
      default:
        alert('Cannot move this card back anymore');
    }
  });
  save.addEventListener('click', () => {
    cardTracker.push(addedCard);
    for (let i = 0; i < cardTracker.length; i++) {
      localStorage.setItem('cardToSave', JSON.stringify(cardTracker)) || [];
    }
  });
};

//uses Local storage to parse the JSON then iterates over the values using a forEach iterator
function getData() {
  let getCardValues = JSON.parse(localStorage.getItem('cardToSave'));
  getCardValues.forEach(addCards);
}

//event listener that takes the function of addCards and gets the data from the CreateCard Class and puts it on screen
addCard.addEventListener('click', addCards);

//pulls data from local storage if applicable
if (localStorage.length > 0) {
  window.addEventListener('load', getData);
}

startover.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});
