$(document).ready(function() {
  let characters = [];
  
  // Retrieve data from JSON file
  $.getJSON('Data.json', function(data) {
  characters = data;
  createTable(characters);
  }).fail(function() {
  alert("Error: Could not retrieve data from JSON file");
  });
  
  // Create table and display characters
  function createTable(characters) {
  let tableBody = $('#tableBody');
  // Add rows to table
function addRow(char) {
  let row = `<tr>
              <td>${char.firstName}</td>
              <td>${char.lastName}</td>
              <td>${char.title}</td>
              <td>${char.house}</td>
              <td>${char.allegiance}</td>
              <td>${char.weapon}</td>
            </tr>`;
  tableBody.append(row);
}
characters.forEach(addRow);

// Event listener for sorting
$('th').click(function() {
  let sortIndex = $(this).index();
  let sortAscending = $(this).data('order') === 'asc';

  // Define the sorting function
  function sortData(a, b) {
    let valueA = a[Object.keys(a)[sortIndex]].toUpperCase();
    let valueB = b[Object.keys(b)[sortIndex]].toUpperCase();
    return sortAscending ? ((valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0)
                         : ((valueA > valueB) ? -1 : (valueA < valueB) ? 1 : 0);
  }

  // Sort the data
  characters.sort(sortData);

  // Display the sorted data
  tableBody.empty();
  characters.forEach(addRow);

  // Update the order attribute of the clicked header
  $('th').removeAttr('data-order');
  $(this).data('order', sortAscending ? 'desc' : 'asc')
         .html($(this).text() + ` &#x25${sortAscending ? 'BC' : 'B2'};`);
});

// Event listener for search
$('#search').on('input', function() {
  let searchText = $(this).val().toUpperCase();

  // Filter the data
  let filteredData = characters.filter(function(char) {
    return Object.values(char).some(function(value) {
      return value.toUpperCase().includes(searchText);
    });
  });

  // Display the filtered data
  tableBody.empty();
  filteredData.forEach(addRow);
});

// Event listener for filter buttons
$('#filterButtons button').click(function() {
  let buttonText = $(this).text().toLowerCase();

  // Filter the data
  let filteredData = characters.filter(function(char) {
    return char.show.toLowerCase() === buttonText;
  });

  // Display the filtered data
  tableBody.empty();
  filteredData.forEach(addRow);
});

// Default sort order
$('th:first').click();
}

});