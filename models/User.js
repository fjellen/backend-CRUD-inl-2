const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  zipcode: { type: Number, required: true },
  city: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//middleware that runs before every mongobd save call via mongoose
UserSchema.pre("save", function (next) {
  if(!this.isModified("password")) next();
  bcrypt.hash(this.password, 10, (err, passwordHashed) => {
    if(err) return next(err);
    this.password = passwordHashed;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
