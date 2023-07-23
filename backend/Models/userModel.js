const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    Pass: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://in.images.search.yahoo.com/images/view;_ylt=AwrKEjinwRVkamQYLAG9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzE2NDU0NGIwOTc4NTdkMThjYTc4NWM4ZjdjNDc0MWE5BGdwb3MDOARpdANiaW5n?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Ddefault%2Bimage%2Bfor%2Bprofile%26type%3DE211IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D8&w=860&h=752&imgurl=www.kindpng.com%2Fpicc%2Fm%2F24-248253_user-profile-default-image-png-clipart-png-download.png&rurl=https%3A%2F%2Fwww.kindpng.com%2Fimgv%2Fiwoxbb_user-profile-default-image-png-clipart-png-download%2F&size=18.8KB&p=default+image+for+profile&oid=164544b097857d18ca785c8f7c4741a9&fr2=piv-web&fr=mcafee&tt=User+Profile+Default+Image+Png+Clipart+%2C+Png+Download+-+Default+User+...&b=0&ni=21&no=8&ts=&tab=organic&sigr=psee422tOeph&sigb=npNrUokfJkMc&sigi=WTFDXsvT5tMk&sigt=UPpOt3.xSxu2&.crumb=CHOoe3UruV1&fr=mcafee&fr2=piv-web&type=E211IN826G0",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save",async function(next){
if(!this.isModified){
    next();
  }
const salt = bcrypt.genSaltSync(10);
this.Pass = bcrypt.hashSync(this.Pass, salt);

});


userSchema.methods.matchpassword=async function(enteredpassword){
  return await bcrypt.compare(enteredpassword, this.Pass);
};
const User = mongoose.model("User", userSchema);
module.exports = User;




