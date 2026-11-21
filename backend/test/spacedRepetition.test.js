import test from 'node:test';
import assert from 'node:assert/strict';
import { nextSm2State } from '../src/utils/spacedRepetition.js';
const initial = { easeFactor: 2.5, intervalDays: 1, repetitions: 0 };
test('successful first review schedules one day', () => {
    const next = nextSm2State(initial, 5);
    assert.equal(next.intervalDays, 1);
    assert.equal(next.repetitions, 1);
});
test('successful second review schedules six days', () => {
    const next = nextSm2State(nextSm2State(initial, 5), 5);
    assert.equal(next.intervalDays, 6);
    assert.equal(next.repetitions, 2);
});
test('unsuccessful review resets the repetition counter', () => {
    const next = nextSm2State({ easeFactor: 2.5, intervalDays: 6, repetitions: 2 }, 2);
    assert.equal(next.intervalDays, 1);
    assert.equal(next.repetitions, 0);
});
test('ease factor never drops below 1.3', () => {
    assert.equal(nextSm2State({ ...initial, easeFactor: 1.3 }, 0).easeFactor, 1.3);
});
