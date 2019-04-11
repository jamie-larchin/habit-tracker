const express = require("express");

const app = express();
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({
    habits: [
        {
            id: 1,
            name: "My first habit"
        }
    ]
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
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ["RS256"]
});
const checkScopes = jwtAuthz(["read:habits"]);

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

app.post("/api/habits", checkJwt, (req, res) => {
    const dbCount = db
        .get("habits")
        .size()
        .value();

    const habits = db
        .get("habits")
        .push({ id: dbCount + 1, name: req.body.name })
        .write();
    res.json(habits);
});

app.get("/api/private-scoped", checkJwt, checkScopes, (req, res) => {
    res.json({
        message:
            "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
    });
});

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     return res.status(err.status).json({ message: err.message });
// });

app.listen(3010);
console.info("Listening on http://localhost:3010");
