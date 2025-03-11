import { Able } from "../src/Able";

describe("Able", () => {
  it("flatten() includes own name", () => {
    expect(Able.flatten({}, ["foo"])).toContain("foo");
  });

  it("flatten() includes group members", () => {
    const flattened = Able.flatten({foo: ["bar", "baz"]}, ["foo"]);
    expect(flattened).toContain("bar");
    expect(flattened).toContain("baz");
  });

  it("flatten() includes group members recursively", () => {
    const definition = {
      foo: ["bar", "baz"],
      baz: ["bam"],
    };
    const flattened = Able.flatten(definition, ["foo"]);
    expect(flattened).toContain("bar");
    expect(flattened).toContain("baz");
    expect(flattened).toContain("bam");
  });

  it("flatten() includes group members recursively (in a loop)", () => {
    const definition = {
      foo: ["bar", "baz"],
      baz: ["bam", "foo"],
    };
    const flattened = Able.flatten(definition, ["foo"]);
    expect(flattened).toHaveLength(4);
    expect(flattened).toContain("foo");
    expect(flattened).toContain("bar");
    expect(flattened).toContain("baz");
    expect(flattened).toContain("bam");
  });

  it("flatten() on it's previous output returns the same result", () => {
    const definition = {
      foo: ["bar", "baz"],
      baz: ["bam", "foo"],
    };
    const prev = Able.flatten(definition, ["foo"]);
    const curr = Able.flatten(definition, prev);
    expect(curr).toEqual(prev);
  });

  it("extractValues() extracts values", () => {
    const abilities = ["other", "?foo=0", "?noEqualSign", "?blankValue=", "?foo=1", "?arr[]=a", "?arr[]=b"];
    expect(Able.extractValues(abilities)).toEqual(
      [{foo: "1", noEqualSign: "", blankValue: "", arr: ["a", "b"]}, ["other"]]);
  });

  it("applyValues() applies values & removes abilities with missing values", () => {
    const abilities = ["metabase:dashboard:4?district={districtId}", "foo:{bar}", "arr:{x}:{y}"];
    const values = {districtId: "1", x: ["a", "b"], y: ["c", "d"]};
    expect(Able.applyValues(abilities, values).sort()).toEqual(
      ["metabase:dashboard:4?district=1", "arr:a:c", "arr:a:d", "arr:b:c", "arr:b:d"].sort());
  });

  it("canAccess() returns true if all required abilities are present", () => {
    const appliedAbilities = ["metabase:dashboard:4?district=1", "foo", "bar"];
    const requiredAbilities = ["metabase:dashboard:4?district=1"];
    expect(Able.canAccess(appliedAbilities, requiredAbilities)).toEqual(true);
  });

  it("canAccess() returns false if not all required abilities are present", () => {
    const appliedAbilities = ["metabase:dashboard:4?district=1", "foo", "bar"];
    const requiredAbilities = ["metabase:dashboard:4?district=1", "baz"];
    expect(Able.canAccess(appliedAbilities, requiredAbilities)).toEqual(false);
  });

  it("resolve() combines definition & applying of values", () => {
    const definition = {
      districtManager: ["metabase:dashboard:5?districtId={districtId}", "unknown:{unknown}"],
      southWest: ["?districtId[]=SW"],
      northWest: ["?districtId[]=NW"],
      westDistrictManager: ["districtManager", "southWest", "northWest"],
    };
    expect(Able.resolve(definition, ["westDistrictManager"])).toEqual([
      "westDistrictManager", "districtManager", "southWest", "northWest",
      "metabase:dashboard:5?districtId=SW", "metabase:dashboard:5?districtId=NW"]);
  });
});
