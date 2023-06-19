//Global variables that are used as the location for the cards
const startover = document.getElementById('startover');
const freshCard = document.getElementById('new');
const addCard = document.getElementById('addCard');
const planning = document.getElementById('planning');
const inProgress = document.getElementById('inprogress');
const testing = document.getElementById('testing');
const completed = document.getElementById('completed');

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
    this.createdCard.remove();
  }
}

addCard.addEventListener('click', () => {
  let addedCard = new CreateCard(); //each click creates new div or object in the DOM
  addedCard.assignValues();
  addedCard.appendDiv();

  //creates var that pull from the class making the code more readable and maintainable
  let cardToMove = addedCard.createdCard;
  let forward = addedCard.moveForward;
  let back = addedCard.moveBack;
  let counter = addedCard.count;
  const rmcard = addedCard.remove;

  //onclick removes the card element using the createCard method RemoveElement()
  rmcard.addEventListener('click', () => {
    addedCard.removeElement();
  });

  //event for moving div forward
  forward.addEventListener('click', () => {
    switch (counter) {
      case 0:
        planning.appendChild(cardToMove);
        counter++;
        break;
      case 1:
        inProgress.appendChild(cardToMove);
        counter++;
        break;
      case 2:
        testing.appendChild(cardToMove);
        counter++;
        break;
      case 3:
        completed.appendChild(cardToMove);
        counter++;
        break;
      default:
        alert('Cannot move this card forward anymore');
    }
  });
  //event to move div back
  back.addEventListener('click', () => {
    switch (counter) {
      case 1:
        freshCard.appendChild(cardToMove);
        counter--;
        break;
      case 2:
        planning.appendChild(cardToMove);
        counter--;
        break;
      case 3:
        inProgress.appendChild(cardToMove);
        counter--;
        break;
      case 4:
        testing.appendChild(cardToMove);
        counter--;
        break;
      default:
        alert('Cannot move this card back anymore');
    }
  });
  //localStorage.setItem('cardToSave', JSON.stringify(cardToMove));
});

/*function getData() {
  freshCard.innerHTML = JSON.parse(localStorage.getItem('cardToSave')); //Leaving off here
}

startover.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});*/
