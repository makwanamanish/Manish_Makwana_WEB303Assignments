
$(document).ready(function() {
    getTeamDataWithAjax();
  });
  


  function getTeamData() {
    $.getJSON('team.json', function(data) {
      $.each(data, function(index, element) {
        const name = `<h2>${element.name}</h2>`;
        const position = `<h5>${element.position}</h5>`;
        const bio = `<p>${element.bio}</p>`;
        $('#team').append(name + position + bio);
      });
    });
  }
  


  function getTeamDataWithAjax() {
    $('#team').text('Loading...');
    $.ajax({
      url: 'team.json',
      type: 'GET',
      dataType: 'json',
      success: function(data) {

        setTimeout(function() {

          $('#team').empty();
          $.each(data, function(index, element) {
            const name = `<h2>${element.name}</h2>`;
            const position = `<h5>${element.position}</h5>`;
            const bio = `<p>${element.bio}</p>`;
            $('#team').append(name + position + bio);
        });
      }, 3000);
    },

    error: function() {
      $('#team').text('Content could not be retrieved.');
      console.error('Content could not be retrieved.');
    }
  });
}