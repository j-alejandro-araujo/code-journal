const $photoUrlInput = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#image');
const $entryList = document.querySelector('ul');

$photoUrlInput.addEventListener('input', () => {
  const imageUrl = $photoUrlInput.value;
  $photoPreview.src = imageUrl;
});

const $form = document.querySelector('#form');
const $titleInput = document.querySelector('#title');
const $notesInput = document.querySelector('#notes');

$form.addEventListener('submit', event => {
  event.preventDefault();

  if (data.editing === null) {
    const entry = {
      entryId: data.nextEntryId,
      title: $titleInput.value,
      notes: $notesInput.value,
      photo: $photoUrlInput.value
    };
    data.nextEntryId++;
    data.entries.unshift(entry);
    const newEntry = renderEntry(entry);
    $entryList.prepend(newEntry);
  } else {
    const updatedEntry = {
      entryId: data.editing.entryId,
      title: $titleInput.value,
      notes: $notesInput.value,
      photo: $photoUrlInput.value
    };

    const editingIndex = data.entries.findIndex(entry => entry.entryId === data.editing.edntryId);

    if (editingIndex !== -1) {
      data.entries[editingIndex] = updatedEntry;
      const updatedEntryDOM = renderEntry(updatedEntry);
      const $originalEntry = $entryList.querySelector('li[data-entry-id="' + data.editing.entryId + '"]');

      $entryList.replaceChild(updatedEntryDOM, $originalEntry);
    }

    $formHeading.textContent = 'New Entry';
    data.editing = null;
  }

  viewSwap('entries');
  toggleNoEntries();

  $photoPreview.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});

function renderEntry(entry) {
  const $listEntry = document.createElement('li');
  $listEntry.setAttribute('class', 'row');
  $listEntry.setAttribute('data-entry-id', entry.entryId);

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

  const $faPencil = document.createElement('i');
  $faPencil.setAttribute('class', 'fa fa-pencil');
  $faPencil.setAttribute('aria-hidden', 'true');
  $entryTitle.appendChild($faPencil);

  const $paragraph = document.createElement('p');
  $paragraph.textContent = entry.notes.trim();

  $textDiv.appendChild($paragraph);
  $listEntry.appendChild($textDiv);

  return $listEntry;
}

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }

  viewSwap(data.view);
  toggleNoEntries();
});

const $noEntries = document.querySelector('div[data-view=entries] .text-center p');

function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

const $view = document.querySelector('div[data-view="entries"]');
const $oldView = document.querySelector('div[data-view="entry-form"]');

function viewSwap(view) {
  if (view === 'entries') {
    $view.setAttribute('class', '');
    data.view = view;
    $oldView.setAttribute('class', 'hidden');
  } else {
    $view.setAttribute('class', 'hidden');
    data.view = view;
    $oldView.setAttribute('class', '');
  }
}

const $entriesAnchor = document.querySelector('#entries-link');
const $newEntryAnchor = document.querySelector('#new-entry');

$entriesAnchor.addEventListener('click', () => {
  viewSwap('entries');
});

$newEntryAnchor.addEventListener('click', () => {
  viewSwap('entry-form');
});

const $formHeading = document.querySelector('div[data-view="entry-form"] h3');

$entryList.addEventListener('click', event => {
  viewSwap('entry-form');
  const $selectedEntry = event.target.closest('li');
  const selectedId = $selectedEntry.getAttribute('data-entry-id');

  if (event.target.classList.contains('fa-pencil')) {
    viewSwap('entry-form');
  }
  for (let i = 0; i < data.entries.length; i++) {
    if (Number(selectedId) === data.entries[i].entryId) {
      data.editing = data.entries[i];
      break;
    }
  }
  $form.elements.title.value = data.editing.title;
  $form.elements.photo.value = data.editing.photo;
  $form.elements.notes.value = data.editing.notes;
  $photoPreview.setAttribute('src', data.editing.photo);
  $formHeading.textContent = 'Edit Entry';
});
