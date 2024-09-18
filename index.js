const COHORT = "2408-RDERIEUX";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/recipes/`;

// === State ===
const state = {
  parties: [
    {
      id: 1,
      name: "Event Name",
      description: "This is a description of the event.",
      date: "2021-09-30T00:00:00.000Z", // Date ISO string
      location: "123 Street",
    },
  ],
};

// Get all the parties from the API
async function getParties() {
  // TODO
  try {
    const response = await fetch(API_URL);
    const responseObj = await response.json();
    debugger;
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
}

// === Script ===
