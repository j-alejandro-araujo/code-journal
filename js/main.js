const $photoUrlInput = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#image');

$photoUrlInput.addEventListener('input', () => {
  const imageUrl = $photoUrlInput.value;
  $photoPreview.src = imageUrl;
});

const $form = document.querySelector('#new-entry');
const $titleInput = document.querySelector('#title');
const $notesInput = document.querySelector('#notes');

$form.addEventListener('submit', event => {
  event.preventDefault();

  const entry = {
    entryId: data.nextEntryId,
    title: $titleInput.value,
    notes: $notesInput.value,
    imageURL: $photoUrlInput.value
  };

  data.nextEntryId++;
  data.entries.unshift(entry);

  const newEntry = renderEntry(entry);
  $entryList.prepend(newEntry);

  viewSwap('entries');
  toggleNoEntries();

  $photoPreview.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});

function renderEntry(entry) {
  const $listEntry = document.createElement('li');
  $listEntry.setAttribute('class', 'row');
  $listEntry.setAttribute('data-entry-id', entry.entryid);

  const $photoDiv = document.createElement('div');
  const $image = document.createElement('img');
  $photoDiv.setAttribute('class', 'column-half entry-photos');
  $image.setAttribute('src', entry.photo);
  $image.setAttribute('alt', entry.title);

  $photoDiv.appendChild($image);
  $listEntry.appendChild($photoDiv);

  const $textDiv = document.createElement('div');
  $textDiv.setAttribute('class', 'column-half');

  const $entryTitle = document.createElement('h3');
  $entryTitle.textContent = entry.title;
  $entryTitle.setAttribute('class', 'space-between');

  $textDiv.appendChild($entryTitle);
  const $paragraph = document.createElement('p');
  $paragraph.textContent = entry.notes.trim();

  $textDiv.appendChild($paragraph);
  $listEntry.appendChild($textDiv);
  return $listEntry;
}

const $entryList = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }
});

const $noEntries = document.querySelector('div[data-view=entries].text-cen p');

function toggleNoEntries() {
  if ($noEntries.classList.contains('hidden')) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

let $view = document.querySelector('div[data-view="entries]');
let $oldView = document.querySelector('div[data-view="entry-form"');

function viewSwap(view) {
  if (view === 'entries') {
    $view.setAttribute('class', '');
    data.view = view;
    $oldView.setAttribute('class', 'hidden');
  } else {
    $view = document.querySelector('div[data-view="entry-form"');
    $view.setAttribute = ('class', '');
    data.view = view;
    $oldView = document.querySelector('div[data-view="entries"');
    $oldView.setAttribute('class', 'hidden');
  }
}

const $entriesAnchor = document.querySelector('.header-link');

$entriesAnchor.addEventListener('click', () => {
  const viewTarget = $entriesAnchor.getAttribute('ada-view');
  viewSwap(viewTarget);
});

const $entriesFormAnchor = document.querySelector('#new-entry');

$entriesFormAnchor.addEventListener('click', () => {
  const viewTarget = $entriesFormAnchor.getAttribute('data-view');
  viewSwap(viewTarget);
});
