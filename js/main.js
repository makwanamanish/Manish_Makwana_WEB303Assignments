// WEB303 Assignment 2
// Name: Manish Makwana

$(document).ready(function() {
    const buttons = ['prospect', 'convert', 'retain'];
    const content = $('#content');
  
    function fetchContent(event) {
      content.slideUp(500, function() {
        const fileName = `${event.target.id}.html`;
  
        $.get(fileName, function(data) {
          content.html(data);
          content.slideDown();
        });
      });
    }
  
    buttons.forEach(function(button) {
      $(`#${button}`).click(fetchContent);
    });
  });