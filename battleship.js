// add event listeners for various events
function init() {
  // event listener to reset screen if on click of reset button
  document.getElementById("reset-button").addEventListener("click", event => {
    resetScreen();
  })

  // event listener to get the size of the grid from form and generate it
  document.getElementById("grid-input-form").addEventListener("submit", event => {
    event.preventDefault();
    var grid;
    var table;
    var grid_size = document.getElementById("grid-input-form").getElementsByTagName("input")[0].value;
    if (grid_size == "") {
      alert("Please input a size value for the grid");
    } else {
      grid = generateGrid(parseInt(grid_size));
      document.getElementById("bg-circle").innerHTML = grid;

      // hide the form after rendering the table
      document.getElementById("grid-input").style.display = "none";
      // display the reset button
      document.getElementById("reset-button").style.display = "inline-block";

      // add event listener on the grid
      document.getElementById("grid").addEventListener("click", event => {
        target = event.path[0]
        if (target.classList.contains("sl") ||
        target.classList.contains("empty")) {
          console.log("The cell is an ID cell");
        } else {
          Grid.handle(target);
        }
      });
    }

    // init the grid object
    if (document.getElementById("grid") != null) {
      // object to represent grid
      Grid = {
        element: document.getElementById("grid"),
        shipPositions: {},
        tries: 0,
        hits: 0,
        handle: function(target) {
          // increment tries by 1
          this.tries += 1
          var row, col;
          // [row, col] = this.getPositions(target);
          position = target.getAttribute("position")
          if (position in this.shipPositions) {
            this.hits += 1;
            this.displayMessage("hit", position);
          } else {
            this.displayMessage("miss", position);
          }
        },
        getPositions: function(cell) {
          var position = cell.getAttribute("position").split(",").map(x => parseInt(x));
          return position;
        },
        displayMessage: function(result, position) {
          console.log("Firing resulted in a " + result);
        }
      }
    }
  });
}

// function to generate grid based on user input
function generateGrid(size) {
  var col = 0;
  var row = 0;
  var inner_html = "<span id=\"span-grid\">";
  inner_html += "<table id=\"grid\">";

  while (row <= size) {
    col = 0;
    inner_html += "<tr class=\"grid-row\" id=\"grid-row-" + row + "\">";
    while (col <= size) {
      var base = ("<td position=\"" + row + "," + col +
        "\" id=\"grid-col-" + col + "\" ");
      var end = "";
      if (row === 0 && col === 0) {
        end += "class=\"grid-col empty\">";
      } else if (row != 0 && col === 0) {
        end += "class=\"grid-col sl\"><p class=\"sl-id\">" + row + "</p>";
      } else if (row === 0 && col != 0) {
        end += "class=\"grid-col sl\"><p class=\"sl-id\">" + col + "</p>";
      } else {
        end += "class=\"grid-col\">";
      }
      end += "</td>";
      inner_html += base + end;
      col += 1
    }
    inner_html += "</tr>"
    row += 1;
  }
  inner_html += "</table></span>";
  return inner_html;
}

// function to handle user clicking the table (the taking a shot at the
// battleship action)
function fireAtShip(row, col) {
  var message = "";
  if ((row + col) % 2 === 0) {
    message = "<p id=\"message\">Sum " + (row + col) + " is even</p>";
  } else {
    message = "<p id=\"message\">Sum " + (row + col) + " is odd</p>";
  }
  document.getElementById('message-area').innerHTML = message;
  document.getElementById('message-area').style.display = "block";
  // get the corresponding cell from the object
  // Check if that cell is occupied by a ship
  // Change colour of cell based on condition
  // Add animations to make it exciting
}

// function to reset the screen
function resetScreen() {
  document.getElementById("reset-button").style.display = "none";
  document.getElementById("bg-circle").innerHTML = "";
  document.getElementById("grid-input").style.display = "block";
  document.getElementById("message-area").style.display = "none";
}


// entrypoint
document.addEventListener("readystatechange", event => {
  if (event.target.readyState === "interactive") {
    init();
  }
})

