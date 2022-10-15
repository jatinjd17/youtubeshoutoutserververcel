const mongoose = require("mongoose");

const userdetailSchema = mongoose.Schema({
  channelname: String,
  channelicon: String,
  channeldescription: String,
  viewcount: String,
  subcount: String,
  videocount: String,
  videostitle1: String,
  videodescription1: String,
  videoimage1: String,
  videostitle2: String,
  videodescription2: String,
  videoimage2: String,
  videostitle3: String,
  videodescription3: String,
  videoimage3: String,
  videostitle4: String,
  videodescription4: String,
  videoimage4: String,
  videostitle5: String,
  videodescription5: String,
  videoimage5: String,
});

exports.User = mongoose.model("usersdetail", userdetailSchema);
