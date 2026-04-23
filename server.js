const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/character/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`https://dragonball-api.com/api/characters/${id}`);

        if (!response.ok) {
            return res.status(404).json({ error: "Pokemon not found" });
        }

        const data = await response.json();

        // Send back only the data we need
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

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});