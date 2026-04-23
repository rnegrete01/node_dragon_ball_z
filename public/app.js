async function loadCharacter() {
    const id = document.getElementById("characterId").value;
    const status = document.getElementById("status");
    const card = document.getElementById("characterCard");

    // Validate input
    if (!id || id < 1 || id > 151) {
        status.textContent = "Please enter a valid Pokémon ID between 1 and 151.";
        card.classList.add("hidden");
        return;
    }

    try {
        status.textContent = "Loading...";
        card.classList.add("hidden");

        const response = await fetch(`/character/${id}`);

        if (!response.ok) {
            throw new Error("Pokemon not found!");
        }

        const character = await response.json();

        // Populate the card
        document.getElementById("characterImage").src = character.image;
        document.getElementById("characterName").textContent = character.name;
        document.getElementById("characterRace").textContent = character.race;
        document.getElementById("characterKi").textContent = character.ki;
        document.getElementById("characterMaxKi").textContent = character.maxKi;
        document.getElementById("characterGender").textContent = character.gender;

        status.textContent = "";
        card.classList.remove("hidden");

    } catch (error) {
        status.textContent = "Error: " + error.message;
        card.classList.add("hidden");
        console.error(error);
    }
}

// Allow pressing Enter to search
document.getElementById("characterId").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        loadCharacter();
    }
});