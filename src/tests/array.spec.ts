import { assert } from "chai";

describe("Array", function () {
    describe("#indexOf()", function () {
        before(() => {
            console.log("Begin");
        });
        this.beforeEach(() => {
            console.log("Before each");
        });
        after(() => {
            console.log("End");
        });

        it("should return -1 when the value is not present", function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
        it("shoud return index when the value is present", function () {
            assert.equal([1, 2, 3].indexOf(1), 0);
        });
        it("should return first index when there is many match", function () {
            assert.equal([1, 1, 1].indexOf(1), 0);
        });
    });
});
