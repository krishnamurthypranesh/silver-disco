// Requirements:


function Grid(gridSize, grid_container) {
  this.size = gridSize;
  this.tries = 0;
  this.numShips = 3;
  this.container = grid_container;
  this.shipLocations = new Object();
  this.hits = 0;
  
  this.render = function () {
    var col = 1, row = 1, position = 1;
    this.elem = document.createElement("table");
    var tableBody = document.createElement("tbody");
    var tableRow, tableCell;

    this.elem.appendChild(tableBody);
    this.elem.setAttribute("id", "grid");

    while (row <= this.size) {
      tableRow = document.createElement("tr"); 
      tableRow.setAttribute("class", "grid-row");
      col = 1;

      while (col <= this.size) {
        tableCell = document.createElement("td");
        tableCell.setAttribute("position", position);
        tableCell.setAttribute("class", "grid-cell");

        col += 1;
        position += 1;
        tableRow.appendChild(tableCell);
      }
      
      row += 1;
      tableBody.appendChild(tableRow);
    }

    this.container.appendChild(this.elem);
  };

  this.setShipLocations = function () {
    var nums = new Array(this.size * this.size);

    for (var i=0; i <= nums.length - 1; i++) {
      nums[i] = i + 1;
    }
   for (var i=0; i < this.numShips; i++) {
     var idx = Math.floor(Math.random() * nums.length);
     loc = nums[idx];

     nums = nums.slice(0, idx).concat(nums.slice(idx + 1, nums.length)); 
     this.shipLocations[loc] = false;
    }
    console.log(this.shipLocations);

  };
}

function init() {
  // declare variables
  var gridSize, grid, grid_container;

  grid_container = document.getElementById("grid-container");

  function getGridSize(event) {
    gridSize = parseInt(event.target.childNodes[3].value);
  }

  function fireAtShip (event) {
    var shipHit, position;
    grid.tries += 1;
    position = parseInt(event.target.getAttribute("position"));
    shipHit = grid.shipLocations[position];
    if (shipHit == undefined) {
      alert("You didn't hit any ships!");
    } else if (shipHit == false) {
      alert("You hit a ship!");
      grid.hits += 1;
      grid.shipLocations[position] = true;
    } else if (shipHit == true) {
      alert("You've already sunk this ship. So, I ain't gonna consider this bruv");
    }
  }

  // add event listener to the form element
  document.getElementById("grid-input-form").addEventListener("submit", event => {
    event.preventDefault();

    getGridSize(event);
    console.log(gridSize);

    grid = new Grid(gridSize, grid_container);
    grid.render();
    grid.setShipLocations();

    document.getElementById(grid.elem.id).addEventListener("click", event => {
      fireAtShip(event);
      // check if the game is over after this
      if (grid.hits == 3) {
        var accuracy;
        accuracy = grid.hits * 100 / grid.tries;
        alert("You've managed to sink all ships!");
        alert("You took " + grid.tries + " tries to sink all ships!");
        alert("This gives you an accuracy of " + accuracy + "%");
      }
    });
  });
}


// entrypoint
document.addEventListener("readystatechange", event => {
  if (event.target.readyState === "interactive") {
    init()
  }
})

