const COHORT = "2408-RDERIEUX";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events/`;

// === State ===
const state = {
  parties: [],
};

// Get all the parties from the API
async function getParties() {
  try {
    const response = await fetch(API_URL);
    const responseObj = await response.json();

    state.parties = responseObj.data;
  } catch (error) {
    console.error(error);
  }
}

// Add a party
async function addParty(party) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(party),
    });
    const responseObj = await response.json();

    if (json.error) {
      throw new Error(json.error.message);
    }
  } catch (error) {
    console.error(error);
  }
}

// Request the API delete a party with a given id
async function deleteParty(id) {
  try {
    const response = await fetch(API_URL + id, {
      method: "DELETE",
    });
    if (!response.ok) {
      const responseObj = await response.json();
      throw new Error(responseObj.error.message);
    }
  } catch (error) {
    console.error(error);
  }
}

// === Render ===

// Render all the parties
function renderParties() {
  // TODO
  const partyList = document.querySelector("#parties");

  if (!state.parties.length) {
    partyList.innerHTML = "<li>No parties for you!</li>";
    return;
  }

  const partyCards = state.parties.map((party) => {
    const card = document.createElement("li");
    card.innerHTML = `
            <dt>${party.name}</dt>
            <dd>${party.date}</dd>
            <dd>${party.location}</dd>
            <dd>${party.description}</dd>
            <button>Delete</Button>
        `;

    const $button = card.querySelector("button");
    $button.addEventListener("click", async () => {
      await deleteParty(party.id);
      await getParties();
      renderParties();
    });
    return card;
  });

  partyList.replaceChildren(...partyCards);
}

//Sync the state with the API and rerender
async function render() {
  await getParties();
  renderParties();
}

// === Script ===
render();

const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formattedPartyDate = new Date(form.partyDate.value).toISOString();
  const party = {
    name: form.partyName.value,
    date: formattedPartyDate,
    location: form.partyLocation.value,
    description: form.partyDescription.value,
  };
  await addParty(party);
  render();
});
