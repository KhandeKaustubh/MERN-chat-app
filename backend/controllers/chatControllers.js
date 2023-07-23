const Chat = require("../Models/Chatmodels");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId params not sent with request");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-Pass")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatname: "sender",
      isGroupChat: false,
      users: [userId, req.user._id],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-Pass"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});
const fetchChats = asyncHandler(async (req, res) => {
    try{
Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
  .populate("users", "-Pass")
  .populate("groupAdmin", "-Pass")
  .populate("latestMessage")
  .sort({"updatedAt":-1})
  .then(async(results)=>{
    results=await User.populate(results,{path:"latestMessage.sender",select:"name pic email"});
    res.status(200).send(results);
  });

}catch(error){
res.status(400);
  throw new Error(error.message);
}    
});
const createGroupChat=asyncHandler(async(req,res)=>{
if(!req.body.users || !req.body.name){
    return res.status(400).send({ message: "Please Fill all the feilds" });
}
var users=req.body.users;
if(users.length<2){
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
}
users.push(req.user._id);
try{
const groupChat= await Chat.create({
    chatname:req.body.name,
    isGroupChat:true,
    users:req.body.users,
    groupAdmin:req.user._id
});
const fullGroupChat=await Chat.findOne({_id:groupChat._id}).populate("users","-Pass").populate("groupAdmin","-Pass")
res.status(200).json(fullGroupChat);
}
catch(error){
res.status(400);
throw new Error(error.message);
}
});
const renameGroup=asyncHandler(async(req,res)=>{
const {chatId,chatName}=req.body;
const updatedChat=await Chat.findByIdAndUpdate(chatId,{chatname:chatName},{new:true})
.populate("users","-Pass").populate("groupAdmin","-Pass");
if(!updatedChat){
res.status(400);
throw new Error("Chat Not Found")
}else{
    res.json(updatedChat);
}
});
const removeFromGroup=asyncHandler(async(req,res)=>{
const {chatId,userId}=req.body;
const removed=await Chat.findByIdAndUpdate(chatId,{$pull:{users:userId}},{new:true})
.populate("users","-Pass")
.populate("groupAdmin","-Pass");
if(!removed){
    res.status(404);
    throw new Error("Chat Not Found");
}
else{
  res.json(removed);
}
});
const addToGroup=asyncHandler(async(req,res)=>{
    const {chatId,userId}=req.body;
    const added=await Chat.findByIdAndUpdate(chatId,{$push:{users:userId}},{new:true,})
    .populate("users","-Pass")
    .populate("groupAdmin","-Pass");
    if(!added){
     res.status(404);
     throw new Error("Chat Not Found");  
    }else{
     res.json(added);
    }
});
module.exports = { accessChat, fetchChats,createGroupChat,renameGroup,removeFromGroup,addToGroup };


