function Grid(gridSize, grid_container) {
  this.size = gridSize;
  this.tries = 0;
  this.numShips = 3;
  this.container = grid_container;
  this.shipLocations = new Object();
  this.hits = 0;
}

// function to render the grid
Grid.prototype.render =  function () {
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

// function to set ship locations randomly
Grid.prototype.setShipLocations =  function () {
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
};

// function to update stats counter
Grid.prototype.updateStatsCounter = function() {
  document.getElementById("ships-hit-count").innerHTML = this.hits;
  document.getElementById("total-tries-count").innerHTML = this.tries;
}

function init() {
  // declare variables
  var gridSize, grid, grid_container;

  grid_container = document.getElementById("grid-container");

  function getGridSize(event) {
    if (gridSize < 2 || gridSize > 50) {
      alert("Please input a value between 2 and 50!");
      return;
    }
    gridSize = parseInt(event.target.childNodes[3].value);
  }

  function resetGridInputForm() {
    (document.getElementById("grid-input-form").
    getElementsByTagName("input")[0].
    value = "");
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

    grid.updateStatsCounter();
  }

  document.getElementById("grid-input-form").addEventListener("submit", event => {
    event.preventDefault();
    event.target.classList.add("hide");

    document.getElementById("reset").classList.remove("hide");

    getGridSize(event);

    grid = new Grid(gridSize, grid_container);
    grid.render();
    grid.setShipLocations();

    document.getElementById("stats-container").setAttribute("class", "");

    document.getElementById(grid.elem.id).addEventListener("click", event => {
      fireAtShip(event);

      if (grid.hits == 3) {
        var accuracy;
        accuracy = grid.hits * 100 / grid.tries;
        alert("You've managed to sink all ships!");
        grid.updateStatsCounter();
        (document.getElementById("accuracy-count").innerHTML =
          parseFloat(accuracy.toFixed(2)));
        document.getElementById("accuracy").classList.remove("hide");
        document.getElementById("play-again").classList.remove("hide")
      }
    });
  });

  (document.getElementById("reset").
    getElementsByTagName("button")[0].
      addEventListener("click", event => {
        event.target.parentNode.classList.add("hide");

        grid_container.innerHTML = "";

        (document.getElementById("grid-input-form").
        classList.remove("hide"));

        resetGridInputForm();

        document.getElementById("stats-container").classList.add("hide");
        document.getElementById("accuracy").classList.add("hide");
    })
  );

  (document.getElementById("play-again"));
}


// entrypoint
document.addEventListener("readystatechange", event => {
  if (event.target.readyState === "interactive") {
    init()
  }
})
