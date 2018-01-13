// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
$("#sizePicker").submit(function(event){
  makeGrid();
  event.preventDefault();
});

// When a table cell is clicked, change its background color
// Have to use on function because child is dynamically created content
$("#pixel_canvas").on("click", "td", function() {
  let color = $("#colorPicker").val();
  $(this).attr("bgcolor", color);
});

function makeGrid() {

  //Get values from input fields
  let height = $("#input_height").val();
  let width = $("#input_width").val();

  //Get table to add rows and cells
  let table = $("#pixel_canvas");

  //First remove the previous grid
  table.children().remove();

  //Add table cells and rows equal to width and height
  for(let i = 0; i < height; i++ ){
    table.append("<tr></tr>");
    for(let j = 0; j < width; j++ ){
      table.find("tr").last().append("<td></td>");
    }
  }

}
