export function nextSm2State(state, quality) {
    const q = Math.min(5, Math.max(0, quality));
    let { easeFactor, intervalDays, repetitions } = { ...state };
    if (q < 3) {
        repetitions = 0;
        intervalDays = 1;
    }
    else {
        if (repetitions === 0) {
            intervalDays = 1;
        }
        else if (repetitions === 1) {
            intervalDays = 6;
        }
        else {
            intervalDays = Math.max(1, Math.round(intervalDays * easeFactor));
        }
        repetitions += 1;
    }
    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    return { easeFactor, intervalDays, repetitions };
}
