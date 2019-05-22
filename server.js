const express = require("express");

const app = express();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({
    habits: [],
    calendar: {}
}).write();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    throw new Error(
        "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file"
    );
}

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ["RS256"]
});

// GET
app.get("/api/habits", checkJwt, (req, res) => {
    const habits = db.get("habits").value();
    res.json(habits);
});

app.get("/api/habits/:id", checkJwt, (req, res) => {
    const { id } = req.params;
    const habit = db
        .get("habits")
        .find({ id: parseInt(id, 10) })
        .value();
    res.json(habit);
});

app.get("/api/calendar/:year/:month", checkJwt, (req, res) => {
    const { year, month } = req.params;
    const calendar = db
        .get("calendar")
        .get(year)
        .get(month)
        .value();
    res.json(calendar);
});

// POST
app.post("/api/habits", checkJwt, (req, res) => {
    const dbCount = db
        .get("habits")
        .size()
        .value();

    const habits = db
        .get("habits")
        .push({ id: dbCount + 1, ...req.body })
        .write();
    res.json(habits);
});

// PUT
app.put("/api/habits/:id", checkJwt, (req, res) => {
    const { id } = req.params;
    const habits = db
        .get("habits")
        .find({ id: parseInt(id, 10) })
        .assign({ ...req.body })
        .write();
    res.json(habits);
});

app.use(({ stack, status, message }, req, res) => {
    console.error(stack);
    return res.status(status).json({ message });
});

app.listen(3010);
console.info("Listening on http://localhost:3010");
