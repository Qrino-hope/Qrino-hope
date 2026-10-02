const catButton = document.querySelector('#catButton');
const moodButton = document.querySelector('#moodButton');
const message = document.querySelector('#catMessage');
const moodLabel = document.querySelector('#moodLabel');

const surprises = [
  'Ого! В небе мигнула новая звезда.',
  'Нокс поймал лунный луч. Почти.',
  'Мур? Это был очень убедительный комплимент.',
  'Хвост сообщает: уровень магии повышен.',
  'Нокс считает тебя частью своей стаи.',
];

let isHappy = false;
let actionTimer;

function react(kind) {
  window.clearTimeout(actionTimer);
  catButton.classList.remove('is-surprised', 'is-happy');
  void catButton.offsetWidth;

  const surprised = kind === 'surprised';
  catButton.classList.add(surprised ? 'is-surprised' : 'is-happy');
  message.textContent = surprised
    ? surprises[Math.floor(Math.random() * surprises.length)]
    : 'Нокс доволен. Ночь стала немного теплее.';

  actionTimer = window.setTimeout(() => {
    catButton.classList.remove('is-surprised', 'is-happy');
  }, surprised ? 1600 : 1800);
}

catButton.addEventListener('click', () => react('surprised'));

moodButton.addEventListener('click', () => {
  isHappy = !isHappy;
  moodButton.setAttribute('aria-pressed', String(isHappy));
  moodLabel.textContent = isHappy ? 'ПОГЛАДИТЬ ЕЩЁ' : 'УДИВИТЬ КОТА';
  react(isHappy ? 'happy' : 'surprised');
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && document.activeElement === document.body) {
    event.preventDefault();
    react('surprised');
  }
});
