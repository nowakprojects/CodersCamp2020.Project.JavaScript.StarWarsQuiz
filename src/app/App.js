import { NavMenu } from './layouts/NavMenu';
import { QuestionImage } from './layouts/QuestionImage';
import { Logo } from './layouts/Logo';
import { MainContainer } from './layouts/MainContainer';
import { Wrapper } from './layouts/Wrapper';
import { Button } from './components/Button';
import { RedButton } from './components/RedButton';
import { QuestionGenerator } from './QuestionGenrator';
import { fetchData } from '../utils/fetchData';
import { getRandomIdFromArray } from '../utils/getRandomIdFromArray';
import { peopleIdArray, starshipsIdArray, vehiclesIdArray } from './settings';
import { ModalWindow } from './layouts/ModalWindow';

export const App = ({ options }) => {
  const app = document.getElementById('swquiz-app');
  renderWrapper(app);
  const wrapper = document.getElementById('wrapper');
  renderNavMenu(wrapper);
  renderLogo(wrapper);
  renderMainContainer(wrapper);
  renderQuestionImage(wrapper);
  renderBtn(document.getElementById('mainContainer'), {
    id: 'HallOfFameButton',
    btnText: 'HallOfFame',
    classList: ['HallOfFameButton'],
    icon: 'fame',
  });
  const mainCointainer = document.getElementById('mainContainer');
  renderRedButton(mainCointainer);

  // Modal window
  const buttonForWindow = document.getElementById('btnForModalWindow');

  function closeFunction() {
    console.log('cos');
  }

  buttonForWindow.onclick = function () {
    const test = document.createElement('div');
    const test2 = document.createElement('div');
    test.appendChild(test2);
    test2.innerText = 'dsadasdsadas';

    const modalWindow = ModalWindow(test, closeFunction);
    modalWindow.style.display = 'block';
  };

  setTimeout(closeFunction, 2000);
};

function renderWrapper(parent) {
  parent.appendChild(Wrapper());
}

function renderQuestionImage(parent) {
  const comp = QuestionImage(
    'c3RhdGljL2Fzc2V0cy9pbWcvbW9kZXMvcGVvcGxlLzQuanBn',
  );
  comp.classList.add('wrapper__mainImg');
  parent.appendChild(comp);
}

function renderLogo(parent) {
  const comp = Logo();
  comp.classList.add('wrapper__logo');
  parent.appendChild(comp);
}

function renderMainContainer(parent) {
  const comp = MainContainer();
  comp.classList.add('wrapper__mainContainer');
  parent.appendChild(comp);
}

function renderBtn(
  parent,
  btnObj = {
    id: '',
    btnText: '',
    classList: [],
    onClickFn: undefined,
    icon: '',
  },
) {
  const comp = Button(btnObj);
  parent.appendChild(comp);
}

function renderNavMenu(parent, activeItemNr = 0) {
  if (document.getElementById('navMenu'))
    parent.removeChild(document.getElementById('navMenu'));

  const comp = NavMenu([
    {
      name: 'people',
      id: 'navMenu__people',
      isActivated: activeItemNr == 0,
      onClickFn() {
        renderNavMenu(parent, 0);
      },
    },
    {
      name: 'vehicles',
      id: 'navMenu__vehicles',
      isActivated: activeItemNr == 1,
      onClickFn() {
        renderNavMenu(parent, 1);
      },
    },
    {
      name: 'starships',
      id: 'navMenu__starships',
      isActivated: activeItemNr == 2,
      onClickFn() {
        renderNavMenu(parent, 2);
      },
    },
  ]);

  comp.classList.add('wrapper__nav');
  parent.appendChild(comp);
}

function renderRedButton(parent) {
  const comp = RedButton('play the game', startGame);
  comp.classList.add('mainContainer__redButton');
  parent.appendChild(comp);
}

const startGame = () => console.log('witaj w grze');

const fetchModeData = (mode, id) =>
  fetchData(mode, id, () =>
    fetch(`https://swapi.dev/api/${mode}/${id}/`).then((response) =>
      response.json(),
    ),
  );
const peopleQuestionGenerator = new QuestionGenerator(
  'people',
  () => getRandomIdFromArray(peopleIdArray),
  fetchModeData,
);
const startshipsQuestionGenerator = new QuestionGenerator(
  'starships',
  () => getRandomIdFromArray(starshipsIdArray),
  fetchModeData,
);
const vehiclesQuestionGenerator = new QuestionGenerator(
  'vehicles',
  () => getRandomIdFromArray(vehiclesIdArray),
  fetchModeData,
);

// how to get data from QuestionGenerator
// console.log(peopleQuestionGenerator.generateQuestion().then(res => console.log(res)));
// console.log(startshipsQuestionGenerator.generateQuestion());
