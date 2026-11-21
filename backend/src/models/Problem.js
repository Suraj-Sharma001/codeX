import mongoose, { Schema } from "mongoose";
const problemSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        index: true,
    },
    platform: {
        type: String,
        enum: ["LeetCode", "Codeforces", "HackerRank", "CodeChef", "AtCoder", "Other"],
        default: "LeetCode",
        index: true,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
        index: true,
    },
    topics: {
        type: [String],
        required: true,
        index: true,
    },
    problemLink: {
        type: String,
        default: null,
    },
    dateSolved: {
        type: Date,
        required: true,
        index: true,
    },
    timeTaken: {
        type: Number,
        required: true,
    },
    revisionCount: {
        type: Number,
        default: 0,
    },
    isFavorited: {
        type: Boolean,
        default: false,
        index: true,
    },
    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Solved", "Revisiting"],
        default: "Solved",
    },
    approaches: {
        bruteForceSolution: {
            description: String,
            timeComplexity: String,
            spaceComplexity: String,
        },
        optimizedSolution: {
            description: String,
            timeComplexity: String,
            spaceComplexity: String,
            keyInsight: String,
        },
    },
    codeSnippets: [
        {
            language: String,
            code: String,
            version: { type: Number, default: 1 },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    keyIntuition: String,
    mistakesMade: [String],
    edgeCases: [String],
    notes: String,
    tags: [String],
    relatedProblems: [
        {
            type: Schema.Types.ObjectId,
            ref: "Problem",
        },
    ],
    revision: {
        markedForRevision: { type: Boolean, default: false, index: true },
        nextRevisionDate: { type: Date, index: true },
        revisionCount: { type: Number, default: 0 },
        revisedAt: [Date],
        canSolveAgain: { type: Boolean, default: true },
        confidenceLevel: { type: Number, default: 3, min: 1, max: 5 },
        easeFactor: { type: Number, default: 2.5 },
        intervalDays: { type: Number, default: 1 },
        sm2Repetitions: { type: Number, default: 0 },
    },
    lastReviewedAt: Date,
}, {
    timestamps: true,
});
// Text index for full-text search
problemSchema.index({ title: "text", notes: "text", tags: "text" });
// Compound indexes for common queries
problemSchema.index({ userId: 1, createdAt: -1 });
problemSchema.index({ userId: 1, difficulty: 1, "revision.markedForRevision": 1 });
problemSchema.index({ userId: 1, topics: 1 });
export const Problem = mongoose.model("Problem", problemSchema);
