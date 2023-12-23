const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const profileSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    details: {
        bio: {
          type: String,
        },
        otherName: {
          type: String,
        },
  
        job: {
          type: String,
        },
        workplace: {
          type: String,
        },
        highschool: {
          type: String,
        },
        college: {
          type: String,
        },
        currentcity: {
          type: String,
        },
        hometown: {
          type: String,
        },
        relationship: {
          type: String,
          enum: ["Single", "In a relationship", "Married", "Divorced"],
        },
        instagram: {
          type: String,
        },
      },
})

module.exports = mongoose.model("Code", profileSchema)