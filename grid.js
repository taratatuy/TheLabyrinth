export class CageStructure {
  constructor(field) {
    this.field = field;
    this._structure = {};
    this._xSize = 23;
    this._ySize = 23;

    this._buildFlooreSpace();
    this._buildWallBorder();
    this._buildLevel();
    this._setNeighbours();
  }

  // Building emty floore space O(n^2):
  _buildFlooreSpace() {
    for (let x = 1; x < this._xSize + 1; x++) {
      for (let y = 1; y < this._ySize + 1; y++) {
        this._structure[x] = {
          ...this._structure[x],
          [y]: new Floor(this.field, x, y),
        };
      }
    }
  }

  // Building wall border O(2n):
  _buildWallBorder() {
    for (let x = 0; x <= this._xSize + 1; x++) {
      this._structure[x] = {
        ...this._structure[x],
        [0]: new Wall(this.field, x, 0),
      };

      this._structure[x] = {
        ...this._structure[x],
        [this._ySize + 1]: new Wall(this.field, x, this._ySize + 1),
      };
    }

    for (let y = 1; y < this._ySize + 1; y++) {
      this._structure[0] = {
        ...this._structure[0],
        [y]: new Wall(this.field, 0, y),
      };

      this._structure[this._xSize + 1] = {
        ...this._structure[this._xSize + 1],
        [y]: new Wall(this.field, this._xSize + 1, y),
      };
    }
  }

  // [TBD] some building function later
  // ----------
  _buildLevel() {
    this.addMatrix([
      [11, 10],
      [9, 10],
      [10, 9],
      [10, 11],
      [14, 17],
      [14, 16],
      [14, 15],
      [14, 14],
      [14, 13],
      [14, 12],
      [14, 11],
      [12, 17],
      [12, 16],
      [12, 15],
      [12, 14],
      [12, 13],
      [12, 12],
      [12, 11],
    ]);
  }
  // ----------

  // Set all neighbours for every Floor cage O(n^2):
  _setNeighbours() {
    for (let x = 1; x < this._xSize + 1; x++) {
      for (let y = 1; y < this._ySize + 1; y++) {
        if (this._structure[x][y] instanceof Floor)
          this._structure[x][y].setNeighbour([
            this._structure[x - 1][y],
            this._structure[x + 1][y],
            this._structure[x][y - 1],
            this._structure[x][y + 1],
            this._structure[x - 1][y - 1],
            this._structure[x - 1][y + 1],
            this._structure[x + 1][y - 1],
            this._structure[x + 1][y + 1],
          ]);
      }
    }
  }

  add(x, y) {
    let cage = new Wall(this.field, x, y);
    this._structure[x] = { ...this._structure[x], [y]: cage };
  }

  addMatrix(matrix) {
    matrix.forEach((cage) => {
      this.add(cage[0], cage[1]);
    });
  }

  filled(x, y) {
    return this._structure[x] ? this._structure[x][y] : undefined;
  }

  setLight(x, y) {
    this._structure[x][y].setLightLevel(4);
  }

  unsetLight(x, y) {
    this._structure[x][y].unsetLightLevel();
  }

  draw() {
    for (let x in this._structure) {
      for (let y in this._structure[x]) {
        this._structure[x][y].draw();
      }
    }
  }
}

// Class Cage for next extends
export class Cage {
  constructor(field, x, y) {
    this._field = field;
    this.x = x;
    this.y = y;
    this.currentColor = 'black';
    this._initialСolor = 'black';
    this.cageSize = 20;
    this._lightLevel = 0;
  }

  draw() {
    this._field.fillStyle = this.currentColor;
    this._field.fillRect(
      this.cageSize * this.x,
      this.cageSize * this.y,
      this.cageSize,
      this.cageSize
    );
  }
}

// Stepable floor cage
export class Floor extends Cage {
  constructor(...args) {
    super(...args);
    this._neighbours = [];
  }

  // Experemental algorithm based on neighbours.
  // 952 iterations for n = 5
  setLightLevel(lightLevel) {
    if (lightLevel > this._lightLevel) {
      this._lightLevel = lightLevel;
      this.currentColor = `rgb(${51 * this._lightLevel}, ${
        51 * this._lightLevel
      }, ${51 * this._lightLevel})`;

      this._neighbours.forEach((neighbour) => {
        neighbour.setLightLevel(this._lightLevel - 1);
      });

      /* 
      // Algorithm for rhomboid spread of light:
      // ----------
      let i = 0; // i = 0-3: straight lines, 4-7: diagonal lines
      this._neighbours.forEach((neighbour) => {
        if (i < 4) {
          neighbour.setLightLevel(this._lightLevel - 1);
          i++;
        } else {
          neighbour.setLightLevel(this._lightLevel - 2);
          i++;
        }
      });
      // ----------
      */
    }
  }

  unsetLightLevel() {
    if (this._lightLevel != 0) {
      this._lightLevel = 0;
      this.currentColor = this._initialСolor;
      this._neighbours.forEach((neighbour) => {
        neighbour.unsetLightLevel();
      });
    }
  }

  setNeighbour(array) {
    this._neighbours = array;
  }
}

// Wall cage
export class Wall extends Cage {
  setLightLevel(lightLevel) {
    this._lightLevel =
      this._lightLevel < lightLevel ? lightLevel : this._lightLevel;
    this.currentColor = `rgb(0, 0, ${51 * this._lightLevel})`;
  }

  unsetLightLevel() {
    this._lightLevel = 0;
    this.currentColor = this._initialСolor;
  }
}
