export class CageStructure {
  constructor(field) {
    this.field = field;
    this._structure = {};
    this._xSize = 20;
    this._ySize = 20;

    for (let x = 1; x < this._xSize + 1; x++) {
      for (let y = 1; y < this._ySize + 1; y++) {
        this._structure[x] = {
          ...this._structure[x],
          [y]: new Floor(this.field, x, y),
        };
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

  changeLight(x, y) {}

  draw() {
    for (let x in this._structure) {
      for (let y in this._structure[x]) {
        this._structure[x][y].draw();
      }
    }
  }
}

// Class Cage for extends
export class Cage {
  constructor(field, x, y) {
    this._field = field;
    this.x = x;
    this.y = y;
    this.color = 'blue';
    this.cageSize = 20;
  }

  draw() {
    this._field.fillStyle = this.color;
    this._field.fillRect(
      this.cageSize * this.x,
      this.cageSize * this.y,
      this.cageSize,
      this.cageSize
    );
  }
}

export class Floor extends Cage {
  constructor(...args) {
    super(...args);
    this.color = 'grey';
  }
}

export class Wall extends Cage {
  changeCollor(color) {
    this._color = color;
  }
}
