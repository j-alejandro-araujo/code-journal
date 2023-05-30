const $photoUrlInput = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#image');

$photoUrlInput.addEventListener('input', () => {
  const $imageUrl = $photoUrlInput.value;
  $photoPreview.src = $imageUrl;
});

const $form = document.querySelector('#new-entry');
const $titleInput = document.querySelector('#title');
const $notesInput = document.querySelector('#notes');

$form.addEventListener('submit', event => {
  event.preventDefault();

  var entry = {
    entryId: data.nextEntryId,
    title: $titleInput.value,
    notes: $notesInput.value,
    imageURL: $photoUrlInput.value
  };

  data.nextEntryId++;
  data.entries.unshift(entry);

  $photoPreview.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});
