const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require ("bcrypt");
const validator = require("validator")
const cors = require('cors');
const axios = require('axios')
// Set up your MongoDB connection
mongoose.connect("mongodb+srv://2051120151:Sdt0779394717@cluster.gcvron7.mongodb.net/Login", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a Mongoose schema for the user model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide username"],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        unique: true,
        required: [true, "Please provide email"],
        validate: {
          validator: validator.isEmail,
          message: "Please provide valid email",
        },
      },
      password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: [6, 'Password must be at least 6 characters.'],
      },
});


const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});


app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      // Hash mật khẩu
      const hashPassword = await bcrypt.hash(password.password, 10);
  
      // Tạo người dùng mới
      const newUser = new User({
        name: username.username,
        email: email.email,
        password: hashPassword
      });
        const savedUser = await newUser.save();
        res.redirect('/login')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" }); // Send an error response to the client with 500 Internal Server Error status
    }
});



app.listen(3000, function () {
    console.log("Server is running on 3000");
});
