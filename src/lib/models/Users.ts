import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto';
var saltFactor = 10

const UserSchema = new mongoose.Schema({
  secret: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  uploads: [{
    uploadId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    filename: {
      type: String,
      required: true
    }
  }]
})

UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(saltFactor, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
})

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema)