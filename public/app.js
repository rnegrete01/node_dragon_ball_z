
/**
 * async function that loads the character
 * @returns {Promise<void>}
 */
async function loadCharacter() {
    /**
     * character's constant ID
     */
    const id = document.getElementById("characterId").value;
    /**
     * character's constant status that is fetched via a getElementById command.
     * @type {HTMLElement}
     */
    const status = document.getElementById("status");
    /**
     * character's card that if fetched via a getElementById command.
     * @type {HTMLElement}
     */
    const card = document.getElementById("characterImage");

    // Validate input
    if (!id || id < 1 || id > 78) {
        status.textContent = "Please enter a valid character ID between 1 and 78.";
        card.classList.add("hidden");
        return;
    }

    try {
        status.textContent = "Loading...";
        card.classList.add("hidden");

        /**
         * constant response that waits for information on selected character's ID.
         * @type {Response}
         */
        const response = await fetch(`/character/${id}`);

        if (!response.ok) {
            throw new Error("Character not found!");
        }

        /**
         * character is a variable that stores the character's information.
         */
        const character = await response.json();

        // Populate the card
        document.getElementById("characterImageDisplay").src = character.image;
        document.getElementById("characterID").textContent = character.id;
        document.getElementById("characterName").textContent = character.name;
        document.getElementById("characterKi").textContent = character.ki;
        document.getElementById("characterMaxKi").textContent = character.maxKi;
        document.getElementById("characterRace").textContent = character.race;
        document.getElementById("characterGender").textContent = character.gender;
        document.getElementById("characterDescription").textContent = character.description;
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