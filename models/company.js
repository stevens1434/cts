var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var companySchema = new mongoose.Schema({
  userId: [{type: [String], ref: 'User'}],
  Name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
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
  Contacts: [
    { Primary: {
        FirstName: {
          type: String,
          required: true,
        },
        LastName: {
          type: String,
          required: true,
        },
        Phone: {
          Business: {
            type: String,
            validate: { validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); } }
          },
          Direct: {
            type: String,
            validate: { validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); } }
          },
          Mobile: {
            type: String,
            validate: { validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); } }
          }
        },
        Title: {
          type: String,
        },
      }
    },
    { Secondary: {
        FirstName: {
          type: String,
          required: true,
        },
        LastName: {
          type: String,
          required: true,
        },
        Phone: {
          Business: {
            type: String,
            validate: { validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); } }
          },
          Direct: {
            type: String,
            validate: { validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); } }
          },
          Mobile: {
            type: String,
            validate: { validator: function(v) { return /\d{3}-\d{3}-\d{4}/.test(v); } }
          }
        },
        Title: {
          type: String,
        },
      }
    }
  ],
  ContactHistory: [
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
  CurrentStage: {
    type: String,
    Required: true
  },
  StageHistory: [
    { StageName: {Type: String},
      DateEntered: {Type: String},
      DateCompleted: {Type: Date},
      MovedToBy: {userId: [{type: [String], ref: 'User'}]}
    }
  ]
  ApprovedForNextStep: {
    type: Boolean,
    default: false
  }
});

var Company = mongoose.model('Company', companySchema);

module.exports = Company;
