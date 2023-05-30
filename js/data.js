/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});

if (localStorage.getItem('data')) {
  var storedDataJSON = localStorage.getItem('data');
  data = JSON.parse(storedDataJSON);
}

// function deleteLocalData() {
//   localStorage.removeItem('data');
// }

// deleteLocalData();

// data = {
//   view: 'entry-form',
//   entries: [],
//   editing: null,
//   nextEntryId: 1
// };
