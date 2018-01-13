// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
$("#sizePicker").submit(function(event){
  makeGrid();
  event.preventDefault();
});



function makeGrid() {

  //Get values from input fields
  var height = $("#input_height").val();
  var width = $("#input_width").val();

  //Get table to add rows and cells
  var table = $("#pixel_canvas");

  //First remove the previous grid
  table.children().remove();

  //Add table cells and rows equal to width and height
  for(var i = 0; i < height; i++ ){
    table.append("<tr></tr>");
    for(var j = 0; j < width; j++ ){
      table.find("tr").last().append("<td></td>");
    }
  }

}
