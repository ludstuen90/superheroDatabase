var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var superheroSchema = new Schema ({
  firstName: String,
  lastName: String,
  city: String,
  superPower: String
});

var heroExport = mongoose.model( 'heroExport', superheroSchema);
module.exports = heroExport;
