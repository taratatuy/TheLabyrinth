import { CageStructure, Wall, Floor } from '../../grid.js';

describe('CageStructure.filled()', function () {
  it('сравнение координат для (5, 10) (6, 10)', function () {
    let cageStrcture = new CageStructure();
    cageStrcture.add(5, 10);
    cageStrcture.add(6, 10);

    chai.assert.equal(cageStrcture.filled(5, 10).x, 5);
    chai.assert.equal(cageStrcture.filled(5, 10).y, 10);
    chai.assert.equal(cageStrcture.filled(6, 10).x, 6);
    chai.assert.equal(cageStrcture.filled(6, 10).y, 10);
  });

  it('bool для (5, 10)', function () {
    let cageStrcture = new CageStructure();
    cageStrcture.add(5, 10);

    chai.assert.isOk(cageStrcture.filled(5, 10));
  });

  it('bool для (5, 11)', function () {
    let cageStrcture = new CageStructure();
    cageStrcture.add(5, 11);

    chai.assert.isOk(cageStrcture.filled(5, 11));
  });

  it('bool для (6, 11)', function () {
    let cageStrcture = new CageStructure();
    cageStrcture.add(6, 11);

    chai.assert.isOk(cageStrcture.filled(6, 11));
  });

  it('bool для (5, 10) (5, 11) (5, 12) (5, 13) (5, 14)', function () {
    let cageStructure = new CageStructure();
    cageStructure.add(5, 10);
    cageStructure.add(5, 11);
    cageStructure.add(5, 12);
    cageStructure.add(5, 13);

    // console.log(
    //   'cageStructure для (5, 10) (5, 11) (5, 12) (5, 13) (5, 14)',
    //   cageStructure
    // );

    chai.assert.isOk(cageStructure.filled(5, 9) instanceof Floor);
    chai.assert.isOk(cageStructure.filled(5, 10) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(5, 11) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(5, 12) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(5, 13) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(5, 14) instanceof Floor);
  });

  it('cageStructure {5: {9 - 14}, 6: {9 - 14}} reverse adding', function () {
    let cageStructure = new CageStructure();
    cageStructure.add(5, 10);
    cageStructure.add(5, 11);
    cageStructure.add(5, 12);
    cageStructure.add(5, 13);

    cageStructure.add(6, 13);
    cageStructure.add(6, 12);
    cageStructure.add(6, 11);
    cageStructure.add(6, 10);

    // console.log(
    //   'cageStructure {5: {9 - 14}, 6: {9 - 14}} reverse add',
    //   cageStructure
    // );

    chai.assert.isOk(cageStructure.filled(5, 9) instanceof Floor);
    chai.assert.isOk(cageStructure.filled(5, 10) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(5, 11) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(5, 12) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(5, 13) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(5, 14) instanceof Floor);

    chai.assert.isOk(cageStructure.filled(6, 14) instanceof Floor);
    chai.assert.isOk(cageStructure.filled(6, 13) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(6, 12) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(6, 11) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(6, 10) instanceof Wall);
    chai.assert.isOk(cageStructure.filled(6, 9) instanceof Floor);
  });
});

describe('CageStructure.addMatrix()', function () {
  it('input [[1, 1],[1, 2],[1, 3],[1, 4]] compare', function () {
    let input = [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ];

    let outputExample = new CageStructure('fake field');

    outputExample.add(1, 1);
    outputExample.add(1, 2);
    outputExample.add(1, 3);
    outputExample.add(1, 4);

    let output = new CageStructure('fake field');

    output.addMatrix(input);

    // console.log('CageStructure.addMatrix()');
    // console.log(outputExample);
    // console.log(output);

    chai.expect(outputExample).to.eql(output);
  });

  it('input [[1, 1],[1, 2],[1, 3],[2, 1],[2, 2],[2, 3]] compare', function () {
    let input = [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 2],
      [2, 3],
    ];

    let outputExample = new CageStructure('fake field');

    outputExample.add(1, 1);
    outputExample.add(1, 2);
    outputExample.add(1, 3);
    outputExample.add(2, 1);
    outputExample.add(2, 2);
    outputExample.add(2, 3);

    let output = new CageStructure('fake field');

    output.addMatrix(input);

    console.log('CageStructure.addMatrix()');
    console.log(outputExample);
    console.log(output);

    chai.expect(outputExample).to.eql(output);
  });
});
