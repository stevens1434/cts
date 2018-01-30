var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 99
  },
  email: { // TODO: Need to add email validation
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 99
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 99
  },
  Birthday: {
    type: Date
  },
  Address: {
    Street: {
      type: String,
      required: true
    },
    UnitNumber: {
      type: String,
      required: true
    },
    City: {
      type: String,
      required: true
    },
    State: {
      type: String,
      required: true
    },
    Zip: {
      type: Number,
      required: true,
      minlength: 00000,
      maxlength: 99999
    }
  },
  ToDo: [
    { Title:
      {type: String, maxlength: 50, required: true}
    },
    { Content:
      {type: String, maxlength: 1000}
    },
    { DueDate:
      {type: Date, required: true}
    },
    { RecordDate:
      {type: Date, default: Date.now}
    }
  ],
  Notes: [
    { Title:
      {type: String, maxlength: 50, required: true}
    },
    { Content:
      {type: String, maxlength: 3000}
    },
    { RecordDate:
      {type: Date, default: Date.now}
    }
  ],
  RoleCat: {
    type: String,
    required: true,
  },
  RoleType: {
    type: String,
    required: true,
  },
  ActiveEmployee: {
    type: Boolean
  },
  Companies: [{type: Number, ref: 'Company'}]
});

// Override 'toJSON' to prevent the password from being returned with the user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      email: ret.email,
      name: ret.name
    };
    return returnJson;
  }
});

userSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res ? this : false);
    }
  });
}

// Mongoose's version of a beforeCreate hook
userSchema.pre('save', function(next) {
  var hash = bcrypt.hashSync(this.password, 10);
  // store the hash as the user's password
  this.password = hash;
  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
