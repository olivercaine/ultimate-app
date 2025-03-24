// Run this after build to test the bundled library

import { add, divide, minus, multiply } from '../dist/index.mjs'

console.log('Testing bundled library...\n')

// Test cases
const testCases = [
  {
    name: 'add',
    fn: add,
    tests: [
      { input: [2, 2], expected: 4 },
      { input: [0, 5], expected: 5 },
      { input: [-1, 1], expected: 0 },
      { input: [10, -5], expected: 5 },
      { input: [0, 0], expected: 0 }
    ]
  },
  {
    name: 'minus',
    fn: minus,
    tests: [
      { input: [4, 2], expected: 2 },
      { input: [0, 5], expected: -5 },
      { input: [-1, -1], expected: 0 },
      { input: [10, -5], expected: 15 },
      { input: [0, 0], expected: 0 }
    ]
  },
  {
    name: 'multiply',
    fn: multiply,
    tests: [
      { input: [2, 2], expected: 4 },
      { input: [0, 5], expected: 0 },
      { input: [-2, 3], expected: -6 },
      { input: [10, -5], expected: -50 },
      { input: [0, 0], expected: 0 }
    ]
  },
  {
    name: 'divide',
    fn: divide,
    tests: [
      { input: [4, 2], expected: 2 },
      { input: [0, 5], expected: 0 },
      { input: [-6, 2], expected: -3 },
      { input: [10, -5], expected: -2 },
      { input: [0, 1], expected: 0 }
    ]
  }
]

let totalPassed = 0
let totalFailed = 0

for (const { name, fn, tests } of testCases) {
  console.log(`Running ${name} function tests...`)
  let passed = 0
  let failed = 0

  tests.forEach((test, index) => {
    const result = fn(test.input[0], test.input[1])
    const passedTest = result === test.expected

    if (passedTest) {
      passed++
      console.log(`  ✓ Test ${index + 1} passed: ${test.input[0]} ${name} ${test.input[1]} = ${result}`)
    } else {
      failed++
      console.error(`  ✗ Test ${index + 1} failed: ${test.input[0]} ${name} ${test.input[1]} = ${result} (expected ${test.expected})`)
    }
  })

  console.log(`  ${name} Summary: ${passed} passed, ${failed} failed\n`)
  totalPassed += passed
  totalFailed += failed
}

console.log('Overall Test Summary:')
console.log(`Total Passed: ${totalPassed}`)
console.log(`Total Failed: ${totalFailed}`)

// Exit with error code if any tests failed
if (totalFailed > 0) {
  process.exit(1)
}
