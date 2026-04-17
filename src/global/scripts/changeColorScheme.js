export function toggleColorScheme() {
  const root = document.documentElement;
  const currentScheme = getComputedStyle(root).getPropertyValue('color-scheme').trim();
  const newScheme = currentScheme === 'dark' ? 'light' : 'dark';

  root.style.setProperty('color-scheme', newScheme);
  localStorage.setItem('colorScheme', newScheme);
}


function applySavedColorScheme() {
  const savedScheme = localStorage.getItem('colorScheme');
  if (savedScheme === 'dark' || savedScheme === 'light') {
    document.documentElement.style.setProperty('color-scheme', savedScheme);
  }
}

applySavedColorScheme();


//trzeba stworzyć funkcję która ładuje zreczy przy starcie strony takie jak
//np tryb ciemn y

//trzeba stworzyć mechanizm zgód na local storage i zarzaądzanie tym np usunięcie
//wpisów z local storage

//Okienko ze zgodami przy logowaniu google i dla local storage