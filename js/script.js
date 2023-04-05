let characters, aToM, nToZ;

// load data from json file
fetch("Data.json")
  .then(response => response.json())
  .then(data => {
    characters = data;

    // sort characters by last name
    characters.sort((a, b) => a.lastName.localeCompare(b.lastName));

    // filter characters by last name initial
    aToM = characters.filter(item => /^[a-m]/i.test(item.lastName));
    nToZ = characters.filter(item => /^[n-z]/i.test(item.lastName));

    // update buttons with filtered data counts
    $("#sortAM").text(`A-M (${aToM.length})`);
    $("#sortNZ").text(`N-Z (${nToZ.length})`);

    // render table with all characters
    addDataToTableBody(characters);
  })
  .catch(error => console.log("Error loading data: ", error));

function addDataToTableBody(data) {
  let rows = data.map(item => `
    <tr>
      <td>${item.firstName}</td>
      <td>${item.lastName}</td>
      <td>${item.title}</td>
      <td>${item.house}</td>
      <td>${item.allegiance}</td>
      <td>${item.weapon}</td>
    </tr>
  `).join("");
  $("#tableBody").empty().append(rows);
}

$("#search").on("keyup", function () {
  const value = $(this).val().toLowerCase();
  $("#tableBody tr").each(function () {
    const match = $(this).text().toLowerCase().includes(value);
    $(this).toggleClass("searchMatched", match);
  });
});

$("button").on("click", function() {
  const id = $(this).attr("id");
  if (id === "sortAM") {
    addDataToTableBody(aToM);
  } else if (id === "sortNZ") {
    addDataToTableBody(nToZ);
  } else if (id === "all") {
    addDataToTableBody(characters);
  }
});
