const { Schema, model } = require('mongoose')


const commentsSchema = new Schema({
  dreamId: {
    type: Schema.Types.ObjectId,
    ref: 'Dream',
    required: true
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  text: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now  //date the comment was created
  },

}, {
  timestamps: true // automatically adds createdAt and updatedAt fields
});

const Comment = model('Comment', commentsSchema);

module.exports = Comment;