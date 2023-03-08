const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "AdeGneus",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "AdeGneus",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "I got ya",
    title: "Help",
    name: "AdeGneus",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({ error: "You must provide an address" });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }
      res.send({
        forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "404",
    errorMessage: "Help article not Found",
    name: "AdeGneus",
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    title: "404",
    errorMessage: "Page not Found",
    name: "AdeGneus",
  });
});

app.listen(3000, () => {
  console.log("Hello from the server");
});
