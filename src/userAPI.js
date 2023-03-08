const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/ping", async (req, res) => {
    res.json({
        message: 'Hello world !!'
    });
});

router.post("/login", async (req, res) => {
    console.log("login");
    res.json({
        message: "Login success"
    });
});

router.post("/createSuperuser", async (req, res) => {
    console.log("createSuperuser");
    res.json({
        message: "createSuperuser success"
    });
});

router.post("/api/v1/register", async (req, res) => {

});

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found or bad request"
    });
});
