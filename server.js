
/**
 * Express module is required
 * @type {e | (() => Express)}
 */
const express = require("express");
/**
 * Path module is required
 * @type {path}
 */
const path = require("path");
/**
 * app is an object of express
 * @type {Express}
 */
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/character/:id", async (req, res) => {
    try {
        /**
         * Constant ID for each character
         */
        const { id } = req.params;
        /**
         * response awaited from dragonball API.
         * @type {Response}
         */
        const response = await fetch(`https://dragonball-api.com/api/characters/${id}`);

        if (!response.ok) {
            return res.status(404).json({ error: "Character not found" });
        }

        /**
         * The response is then stored inside a variable called "data"
         */
        const data = await response.json();

        /**
         * This is the data that response returns.
         */
        res.json({
            id: data.id,
            name: data.name,
            ki: data.ki,
            maxKi: data.maxKi,
            race: data.race,
            gender: data.gender,
            description: data.description,
            image: data.image
        });

    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

/**
 * listen at port 3000, which the server runs on.
 */
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});