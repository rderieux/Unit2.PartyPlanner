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
async function addParty() {
  // TODO
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
        `;
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
