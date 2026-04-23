const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/pokemon/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!response.ok) {
            return res.status(404).json({ error: "Pokemon not found" });
        }

        const data = await response.json();

        // Send back only the data we need
        res.json({
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            types: data.types.map(t => t.type.name),
            abilities: data.abilities.map(a => a.ability.name),
            sprite: data.sprites.front_default
        });

    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});