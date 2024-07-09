const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,
  },
  copytrading: {
    type: String,
    
  },

  socialUsernames: {
    type: Array,
    
  },
  phoneNumber: {
    type: String,
    
  },
  verify: {
    type: String,
    
  },
  collections: {
    type: Array,
    
  },
  artWorks: {
    type: Array,
    
  },
  verification:{
type:Array
  },
 
  trader: {
    type: String,
    
  },
  condition: {
    type: String,
    
  },
  kyc: {
    type: String,
    
  },
  username: {
    type: String,
    
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  referralCode:{
    type:String,
  },
  referredUsers:{
    type:Array,
  },
  planHistory:{
    type:Array,
  },
  referredBy:{
    type:String,
  },
  plan:{
    type:String,
  },
 
 
  password: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  amountDeposited: {
    type: String,
  },
  profit: {
    type: String,
  },
  balance: {
    type: String,
  },
  referalBonus: {
    type: String,
  },
  transactions: {
    type: Array,
  },
  accounts: {
    type: Object,
  },
  withdrawals: {
    type: Array,
  },
  verified: {
    type: Boolean,
  },
  isDisabled: {
    type: Boolean,
  },
});

module.exports = mongoose.model("users", UsersSchema);
