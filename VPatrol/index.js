require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const app = express();

const ejs = require("ejs");


// Middleware
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.set("view engine", "ejs");


const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

//--------------------------------------------------------

async function main() {
  try {
  await mongoose.connect(uri);
  console.log('Connected successfully to server');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}
}

main()
  .catch(console.error)
//-------------------------------------------------------------

const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    unique: true,
    required: true,
  },
  user_name: String,
  back_accounts: [String],
  id: Number,
  name: String,
  accounts: {
    bank: String,
    branch: String,
    address: String,
    city: String,
    district: String,
    state: String,
    bank_code: String,
    weather: {
      temp: Number,
      humidity: Number,
    },
  },
});

 const User = mongoose.model("User", UserSchema);

app.get("/", async (req, res) => {
  try {
    res.render("home", { isRegistered: null });
    //res.send("hello")
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/", async (req, res) => {
  try {
    const user_id = req.body.user_id;
    console.log(user_id)
    //console.log(User)
    const user = await User.findOne({ user_id: user_id })
    if (user) {
      res.render("home", { isRegistered: true });
    } else {
      res.render("home", { isRegistered: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/allUsers", async (req, res) => {
  const {
    user_id,
    user_name,
    bank_accounts,
    id,
    name,
    bank,
    branch,
    address,
    city,
    district,
    state,
    bank_code,
    temperature,
    humidity,
  } = req.body;

  try {
    const user = await User.findOne({ user_id: user_id })

    if (user) {
      user.user_id = user_id;
      user.user_name = user_name;
      user.bank_accounts = bank_accounts;
      user.id = id;
      user.name = name;
      user.accounts.bank = bank;
      user.accounts.branch = branch;
      user.accounts.address = address;
      user.accounts.city = city;
      user.accounts.district = district;
      user.accounts.state = state;
      user.accounts.bank_code = bank_code;
      user.accounts.weather.temp = temperature;
      user.accounts.weather.humidity = humidity;

      await user.save();
      res.redirect("/allUsers");
    } else {
      console.log("User not found");
      res.redirect("/register");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/allUsers", async (req, res) => {
  
  try {
    const users = await User.find({ user_id: { $ne: null } });
    res.render("allUsers", { registeredUsers: users });
  } catch (error) {
    console.log(error);
  }
});
app.post("/submit", async (req, res) => {
  try{
  const {
    user_id,
    user_name,
    bank_accounts,
    id,
    name,
    bank,
    branch,
    address,
    city,
    district,
    state,
    bank_code,
    temperature,
    humidity,
  } = req.body;

  const user = new User({
    user_id,
    user_name,
    back_accounts: bank_accounts,
    id,
    name,
    accounts: {
      bank,
      branch,
      address,
      city,
      district,
      state,
      bank_code,
      weather: {
        temperature,
        humidity,
      },
    },
  })
console.log(user);
  
   await user.save();
   res.redirect("/allUsers");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new route for fetching weather data
app.get("/getWeather", async (req, res) => {
  const cityName = req.query.city; // Get the city name from the query parameter

  try {
    // Make a GET request to the OpenWeather API to fetch weather data
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`
    );

    if (response.status === 200) {
      const { temp, humidity } = response.data.main;
      // Send the weather data as JSON to the client
      res.json({ temp, humidity });
    } else {
      // Handle the case where the request to the OpenWeather API was not successful
      res.status(404).json({ error: "City not found" });
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`server started on port ${port}`));
