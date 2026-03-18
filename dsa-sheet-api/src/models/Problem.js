const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: [true, 'Topic reference is required'],
    },
    title: {
      type: String,
      required: [true, 'Problem title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: [true, 'Difficulty is required'],
    },
    youtubeUrl: {
      type: String,
      default: '',
    },
    leetcodeUrl: {
      type: String,
      default: '',
    },
    articleUrl: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

problemSchema.index({ topicId: 1, order: 1 });
problemSchema.index({ topicId: 1, slug: 1 }, { unique: true });

module.exports = mongoose.model('Problem', problemSchema);
