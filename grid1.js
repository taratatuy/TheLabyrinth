// ------- Realizing strategy pattern here -------

export class CageStructure {
  constructor() {
    this._structure = {};
  }

  add(cage) {
    this._structure[cage.x] = { ...this._structure[cage.x], [cage.y]: cage };
  }
}

export class Cage {
  constructor(field, x, y, type) {
    this._field = field;
    this.x = x;
    this.y = y;
    this._type = type || new Floor(x, y); // class Floor or class Wall
    this.cageSize = 10;
  }

  setType(type) {
    this._type = type;
  }

  draw() {
    this._type.draw(this.cageSize);
  }
}

export class Floor {
  constructor(field, x, y) {
    this._field = field;
    this.x = x;
    this.y = y;
    this._color = 'black';
  }

  draw(cageSize) {
    this._field.fillStyle = this._color;
    this._field.fillRect(
      cageSize * this.x,
      cageSize * this.y,
      cageSize,
      cageSize
    );
  }
}

export class Wall {
  constructor(field, x, y) {
    this._field = field;
    this.x = x;
    this.y = y;
    this._color = 'blue';
  }

  changeCollor(color) {
    this._color = color;
  }

  draw(cageSize) {
    this._field.fillStyle = this._color;
    this._field.fillRect(
      cageSize * this.x,
      cageSize * this.y,
      cageSize,
      cageSize
    );
  }
}
