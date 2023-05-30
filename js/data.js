/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});

if (localStorage.getItem('data')) {
  const storedDataJSON = localStorage.getItem('data');
  data = JSON.parse(storedDataJSON);
}
