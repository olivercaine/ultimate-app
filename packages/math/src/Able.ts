export namespace Able {
  /**
   * A list of resolved or unresolved abilities.
   */
  export type AbilitySet = string[];

  /**
   * A map of ability aliases, where a single alias (the key) maps to a set of
   * abilities (value). This map can be resolved recursively.
   *
   * Example value:
   *
   * ```js
   * { "foo": ["bar"], "bar": ["baz", "bam"], "xxx": ["yyy"] }
   * ```
   *
   * With the above example value, given a list of abilities `["foo"]`, the
   * resolved abilities will be `["foo", "bar", "baz", "bam"]`.
   */
  export interface GroupDefinition { [key: string]: AbilitySet|string|null|undefined; }

  /**
   * A map of values extracted or to be applied in a list of abilities. A
   * `ValueMap` of `{ foo: "bar", baz: ["1", "2"] }` equals to list of abilities
   * `["?foo=bar", "?baz[]=1", "?baz[]=2"]`.
   */
  export interface ValueMap { [key: string]: string|string[]; }

  /**
   * Resolve a set of abilities with a group definition, returning a set of
   * abilities based on all abilities and references to groups in `abilities`.
   *
   * Unlike `.resolve`, this function does not apply or resolve values.
   *
   * ```ts
   * const definition = { foo: ["bar"] };
   * const abilities = ["foo", "bam"];
   * Able.flatten(definition, abilities);
   * // ["foo", "bam", "bar"]
   * ```
   *
   * @param definition
   * @param abilities
   */
  export function flatten(definition: GroupDefinition, abilities: AbilitySet): AbilitySet {
    abilities = abilities.slice();
    for (const ability of abilities) {
      const members = arr(definition[ability]);
      for (const member of members) {
        if (!abilities.includes(member)) {
          abilities.push(member);
        }
      }
    }
    return abilities;
  }

  /**
   * Extract values from a resolved set of abilities and return the values as a
   * map with the remaining abilities.
   *
   * Example:
   *
   * ```ts
   * const abilities = ["foo", "bam", "?foo=1", "?x[]=3"];
   * Able.extractValues(abilities);
   * // [ { foo: '1', x: [ '3' ] }, [ 'foo', 'bam' ] ]
   * ```
   *
   * @param abilities
   */
  export function extractValues(abilities: AbilitySet): [ValueMap, AbilitySet] {
    const values: ValueMap = {};
    const remainder: string[] = [];
    for (const ability of abilities) {
      if (ability[0] === "?") {
        const [key, value] = ability.substr(1).split("=", 2);
        if (key[key.length - 2] === "[" && key[key.length - 1] === "]") {
          const arrKey = key.substr(0, key.length - 2);
          if (!(values[arrKey] instanceof Array)) {
            values[arrKey] = [];
          }
          if (typeof value !== "undefined") {
            (values[arrKey] as string[]).push(value);
          }
        } else {
          values[key] = typeof value === "undefined" ? "" : value;
        }
      } else {
        remainder.push(ability);
      }
    }
    return [values, remainder];
  }

  /**
   * Replacing template abilities with a given set of values applied. Template
   * abilities with missing values are removed.
   *
   * Example:
   *
   * ```ts
   * const abilities = ["article:{articleId}:read", "post:{postId}:read"]
   * const values = { articleId: ["1", "2"] }
   * Able.applyValues(abilities, values);
   * // [ 'article:1:read', 'article:2:read' ]
   * ```
   *
   * @param abilities
   * @param values
   */
  export function applyValues(abilities: AbilitySet, values: ValueMap): AbilitySet {
    const REGEX = /\{([^}]+)\}/g;
    return abilities.reduce((outerAbilitiesAcc, ability) => {
      const match = ability.match(REGEX);
      if (!match) {
        return outerAbilitiesAcc.concat([ability]);
      }
      return outerAbilitiesAcc.concat(match
        .map((k) => k.substr(1, k.length - 2))
        .reduce((abilitiesAcc, k) =>
          abilitiesAcc.reduce((acc, innerAbility) =>
            acc.concat(arr(values[k]).map((v) => innerAbility.replace(`{${k}}`, v))), [] as string[]), [ability]));
    }, [] as string[]);
  }

  /**
   * Flatten abilities, and extract and apply embedded values.
   *
   * ```ts
   * const definition = { writer: ["article:{articleId}:write"] };
   * const abilities = ["writer", "?articleId[]=4"];
   * Able.resolve(definition, abilities);
   * // [ 'writer', 'article:4:write' ]
   * ```
   *
   * @param definition
   * @param abilities
   */
  export function resolve(definition: GroupDefinition, abilities: AbilitySet): AbilitySet {
    const flattened = Able.flatten(definition, abilities);
    const [extractedValues, extractedAbilities] = Able.extractValues(flattened);
    return Able.applyValues(extractedAbilities, extractedValues);
  }

  /**
   * Compare a set of resolved abilities with a set of required abilities, and
   * return all abilities in `requiredAbilities` missing in `abilities`. Returns
   * an empty array if `abilities` contains all abilities from
   * `requiredAbilities`.
   * @param abilities
   * @param requiredAbilities
   */
  export function getMissingAbilities(abilities: AbilitySet, requiredAbilities: AbilitySet): AbilitySet {
    return requiredAbilities.filter((ability) => !abilities.includes(ability));
  }

  /**
   * Similar to `getMissingAbilities`, but returns `true` if there are no
   * missing abilities. In effect, this function returns whether the user has
   * access to something that requires a set of abilities. Only returns `true`
   * if `appliedAbilities` include all abilities in `requiredAbilities`.
   * @param appliedAbilities
   * @param requiredAbilities
   */
  export function canAccess(appliedAbilities: AbilitySet, requiredAbilities: AbilitySet): boolean {
    return this.getMissingAbilities(appliedAbilities, requiredAbilities).length === 0;
  }
}

function arr(valueOrValues?: string|string[]|null): string[] {
  if (valueOrValues === "") {
    return [""];
  } else if (typeof valueOrValues === "undefined" || valueOrValues === null) {
    return [];
  } else if (typeof valueOrValues === "string") {
    return [valueOrValues];
  } else {
    return valueOrValues;
  }
}
