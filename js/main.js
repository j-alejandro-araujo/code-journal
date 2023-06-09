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

    const editingIndex = data.entries.findIndex(entry => entry.entryId === data.editing.entryId);

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
const $deleteButton = document.querySelector('#delete-button');

function viewSwap(view) {
  if (view === 'entries') {
    $view.setAttribute('class', '');
    data.view = view;
    $oldView.setAttribute('class', 'hidden');
    $deleteButton.classList.add('hidden');
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
  if (data.editing === null) {
    viewSwap('entry-form');
  } else {
    $form.reset();
    data.editing = null;
    $formHeading.textContent = 'New Entry';
    $photoPreview.src = 'images/placeholder-image-square.jpg';
  }
});

const $formHeading = document.querySelector('div[data-view="entry-form"] h3');

$entryList.addEventListener('click', event => {
  const $selectedEntry = event.target.closest('li');
  const $pencilIcon = $selectedEntry.querySelector('.fa-pencil');
  if ($pencilIcon && event.target === $pencilIcon) {
    viewSwap('entry-form');
    const selectedId = $selectedEntry.getAttribute('data-entry-id');
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
    $deleteButton.classList.remove('hidden');
  }
});

const $popup = document.querySelector('#popup');
const $cancelButton = document.querySelector('#cancel');
const $confirmButton = document.querySelector('#confirm');

$deleteButton.addEventListener('click', () => {
  $popup.classList.remove('hidden');
});

$cancelButton.addEventListener('click', () => {
  $popup.classList.add('hidden');
});

$confirmButton.addEventListener('click', () => {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(i, 1);
      break;
    }
  }
  const $removeLi = document.querySelector('[data-entry-id="' + data.editing.entryId + '"]');
  $removeLi.remove();
  if (data.entries.length === 0) {
    toggleNoEntries();
  }
  $popup.classList.add('hidden');
  viewSwap('entries');
  data.editing = null;
  $form.reset();
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $deleteButton.classList.add('hidden');
  $formHeading.textContent = 'New Entry';
});
