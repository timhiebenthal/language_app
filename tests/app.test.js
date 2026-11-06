const test = require('node:test');
const assert = require('node:assert/strict');
const { gradeAnswer, loadProgress, saveProgress } = require('../app.js');

test('grades a selected answer and returns explanatory feedback', () => {
  assert.deepEqual(gradeAnswer({ selected: 1, correct: 1, explanations: ['Try again', 'Correct: im is used here'] }), { correct: true, feedback: 'Correct: im is used here' });
});

test('loads and saves browser progress safely', () => {
  const values = new Map();
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  saveProgress(storage, { completed: true, score: 2 });
  assert.deepEqual(loadProgress(storage), { completed: true, score: 2 });
});
