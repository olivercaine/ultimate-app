import {add} from "../src";

test("add is exported", () => {
  expect(add).toBeInstanceOf(Object);
});
