const mongoose = require("mongoose");

// "title":"","category":"", "description":"","CTC":"","skils":"","qualification":""
const JobsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a jobs title"],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "Please add a category"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  CTC: {
    type: String,
    required: [true, "Please add a ctc"],
  },
  skils: {
    type: String,
    required: [true, "Please add a skill"],
  },
  qualification:{
    type: String,
    required: [true, "Please add a skill"],
  },
  // rate: {
  //   type: String,
  //   required: [true, "Please add rate"],
  // },
  // stock: {
  //   type: Number,
  //   required: [true, "Please add in stock"],
  // },
  // photo: [
  //   {
  //     type: String,
  //     default: "no-photo.jpg",
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Static method to get avg of course tuitions
// JobsSchema.statics.getAverageCost = async function (companyId) {
//   const obj = await this.aggregate([
//     {
//       $match: { company: companyId },
//     },
//     {
//       $group: {
//         _id: "$company",
//         averageCost: { $avg: "$tuition" },
//       },
//     },
//   ]);

//   try {
//     await this.model("Company").findByIdAndUpdate(companyId, {
//       averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Call getAverageCost after save
// JobsSchema.post("save", function () {
//   this.constructor.getAverageCost(this.company);
// });

// // Call getAverageCost before remove
// JobsSchema.pre("remove", function () {
//   this.constructor.getAverageCost(this.company);
// });

module.exports = mongoose.model("Jobs", JobsSchema);
