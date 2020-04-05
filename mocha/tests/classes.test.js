import { WallStructure, Wall } from '../../classes.js';

describe('WallStructure.filled()', function () {
  it('сравнение координат для (5, 10) (6, 10)', function () {
    let wallStrcture = new WallStructure();
    wallStrcture.add(new Wall('', 5, 10));
    wallStrcture.add(new Wall('', 6, 10));

    chai.assert.equal(wallStrcture.filled(5, 10).x, 5);
    chai.assert.equal(wallStrcture.filled(5, 10).y, 10);
    chai.assert.equal(wallStrcture.filled(6, 10).x, 6);
    chai.assert.equal(wallStrcture.filled(6, 10).y, 10);
  });

  it('bool для (5, 10)', function () {
    let wallStrcture = new WallStructure();
    wallStrcture.add(new Wall('', 5, 10));

    chai.assert.isOk(wallStrcture.filled(5, 10));
  });

  it('bool для (5, 11)', function () {
    let wallStrcture = new WallStructure();
    wallStrcture.add(new Wall('', 5, 11));

    chai.assert.isOk(wallStrcture.filled(5, 11));
  });

  it('bool для (6, 11)', function () {
    let wallStrcture = new WallStructure();
    wallStrcture.add(new Wall('', 6, 11));

    chai.assert.isOk(wallStrcture.filled(6, 11));
  });

  it('bool для (5, 10) (5, 11) (5, 12) (5, 13) (5, 14)', function () {
    let wallStructure = new WallStructure();
    wallStructure.add(new Wall('', 5, 10));
    wallStructure.add(new Wall('', 5, 11));
    wallStructure.add(new Wall('', 5, 12));
    wallStructure.add(new Wall('', 5, 13));

    console.log(
      'wallStructure для (5, 10) (5, 11) (5, 12) (5, 13) (5, 14)',
      wallStructure
    );

    chai.assert.isNotOk(wallStructure.filled(5, 9));
    chai.assert.isOk(wallStructure.filled(5, 10));
    chai.assert.isOk(wallStructure.filled(5, 11));
    chai.assert.isOk(wallStructure.filled(5, 12));
    chai.assert.isOk(wallStructure.filled(5, 13));
    chai.assert.isNotOk(wallStructure.filled(5, 14));
  });

  it('wallStructure {5: {9 - 14}, 6: {9 - 14}} reverse add', function () {
    let wallStructure = new WallStructure();
    wallStructure.add(new Wall('', 5, 10));
    wallStructure.add(new Wall('', 5, 11));
    wallStructure.add(new Wall('', 5, 12));
    wallStructure.add(new Wall('', 5, 13));

    wallStructure.add(new Wall('', 6, 13));
    wallStructure.add(new Wall('', 6, 12));
    wallStructure.add(new Wall('', 6, 11));
    wallStructure.add(new Wall('', 6, 10));

    console.log(
      'wallStructure {5: {9 - 14}, 6: {9 - 14}} reverse add',
      wallStructure
    );

    chai.assert.isNotOk(wallStructure.filled(5, 9));
    chai.assert.isOk(wallStructure.filled(5, 10));
    chai.assert.isOk(wallStructure.filled(5, 11));
    chai.assert.isOk(wallStructure.filled(5, 12));
    chai.assert.isOk(wallStructure.filled(5, 13));
    chai.assert.isNotOk(wallStructure.filled(5, 14));

    chai.assert.isNotOk(wallStructure.filled(6, 14));
    chai.assert.isOk(wallStructure.filled(6, 13));
    chai.assert.isOk(wallStructure.filled(6, 12));
    chai.assert.isOk(wallStructure.filled(6, 11));
    chai.assert.isOk(wallStructure.filled(6, 10));
    chai.assert.isNotOk(wallStructure.filled(6, 9));
  });
});
