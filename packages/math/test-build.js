const assert = require("assert");
const Able = require("./dist");

const definition = { foo: ["bar"] };
const abilities = ["foo", "bam"];
const result = Able.flatten(definition, abilities).sort();
assert.deepStrictEqual(result, ["foo", "bar", "bam"].sort());

console.log("OK!");
