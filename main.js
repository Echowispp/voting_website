console.log("Hi there!");

const SUPABASE_URL = "https://mdwbbttknicemakzuyhu.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kd2JidHRrbmljZW1ha3p1eWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1Njk3NTcsImV4cCI6MjA3NTE0NTc1N30.oGVMVW7TDvnZEfdD9Ercw0p7nrQk_4eKT1WjeP39jLU";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("Chart.js version:", Chart?.version);

//sets a max # of times a user can vote

const maxVotes = 5;
let votesLeft = maxVotes;
const barColors = ["#8080aa", "#a0a0cf", "#313190", "#8080ff"];

// classes related to these are written as "cand#"
let candidate1 = 0;
let candidate2 = 0;
let candidate3 = 0;
let candidate4 = 0;

// need these for the graph, the value is assigned later in the case of voteGraph
let voteGraph;
const xValues = ["Candidate 1", "Candidate 2", "Candidate 3", "Candidate 4"];
let yValues = [candidate1, candidate2, candidate3, candidate4];

//cookie functions

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i = i + 1) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
}

function initializeCookiesLeft() {
  const savedVotes = getCookie("cookieVotes");
  if (savedVotes !== null) {
    votesLeft = parseInt(savedVotes);
    console.log("Loaded votes from cookie", votesLeft);
  } else {
    votesLeft = maxVotes;
    setCookie("cookieVotes", votesLeft, 30);
    console.log("Made new cookie, changing votes to", votesLeft);
  }
  updateVotesDisplay();
}

//subabase syncing functions (constants at the top)

function updateVotesDisplay() {
  const display = document.querySelector(".votesDisplay");
  if (display) {
    display.innerText = votesLeft;
  }
}

function saveVotesToCookie() {
  setCookie("cookieVotes", votesLeft, 30);
}

async function loadVotes() {
  const { data, error } = await supabase.from("votes").select("*").order("id");

  if (data) {
    candidate1 = data[0].vote_count;
    candidate2 = data[1].vote_count;
    candidate3 = data[2].vote_count;
    candidate4 = data[3].vote_count;
    updateAllDisplays();
    updateGraph();
  }
}

supabase
  .channel("votes-channel")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "votes" },
    (payload) => {
      console.log("Change received", payload);
      loadVotes();
    }
  )
  .subscribe();

function updateAllDisplays() {
  document.querySelector(".cand1_value").innerText = candidate1;
  document.querySelector(".cand2_value").innerText = candidate2;
  document.querySelector(".cand3_value").innerText = candidate3;
  document.querySelector(".cand4_value").innerText = candidate4;
}

async function updateVoteInDB(candidateID, newCount) {
  const { error } = await supabase
    .from("votes")
    .update({ vote_count: newCount })
    .eq("id", candidateID);

  if (error) {
    console.error(
      "Error updating vote, refreshing should fix it and get your vote back",
      error
    );
  }
}

//bar graph functions

function updateGraph() {
  //const xValues = ["Candidate 1", "Candidate 2", "Candidate 3", "Candidate 4"]; const yValues = [candidate1, candidate2, candidate3, candidate4];if (voteGraph) {voteGraph.destroy();}

  const canvas = document.getElementById("voteChart");
  if (!canvas) {
    console.warn("Canvas element not found - skipping chart update");
    return;
  }

  const ctx = canvas.getContext("2d");
  console.log(
    "Rendering chart with:",
    candidate1,
    candidate2,
    candidate3,
    candidate4
  );

  if (voteGraph) {
    voteGraph.destroy();
  }

  voteGraph = new Chart(ctx, {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true, // Start y-axis at 0
          ticks: {
            stepSize: 1, // Show whole numbers only
          },
        },
      },
      plugins: {
        legend: {
          display: false, // Hide the legend since we only have one dataset
        },
        title: {
          display: true,
          text: "Vote Distribution",
        },
      },
    },
  });
}

//Functions for cand1 below

function update1() {
  document.querySelector(".cand1_value").innerText = candidate1;
}

async function addVote1() {
  if (votesLeft > 0) {
    votesLeft = votesLeft - 1;
    candidate1 = candidate1 + 1;
    update1();
    await updateVoteInDB(1, candidate1);
    saveVotesToCookie();
    updateVotesDisplay();
  } else {
    alert(`You've voted your maximum of ${maxVotes} times`);
  }
}
document.querySelector(".cand1_add").onclick = addVote1;

//Functions for cand2 below

function update2() {
  document.querySelector(".cand2_value").innerText = candidate2;
}

async function addVote2() {
  if (votesLeft > 0) {
    votesLeft = votesLeft - 1;
    candidate2 = candidate2 + 1;
    update2();
    await updateVoteInDB(2, candidate2);
    saveVotesToCookie();
    updateVotesDisplay();
  } else {
    alert(`You've voted your maximum of ${maxVotes} times`);
  }
}
document.querySelector(".cand2_add").onclick = addVote2;

//Functions for cand3 below

function update3() {
  document.querySelector(".cand3_value").innerText = candidate3;
}

async function addVote3() {
  if (votesLeft > 0) {
    votesLeft = votesLeft - 1;
    candidate3 = candidate3 + 1;
    update3();
    await updateVoteInDB(3, candidate3);
    saveVotesToCookie();
    updateVotesDisplay();
  } else {
    alert(`You've voted your maximum of ${maxVotes} times`);
  }
}
document.querySelector(".cand3_add").onclick = addVote3;

//Functions for cand4 below

function update4() {
  document.querySelector(".cand4_value").innerText = candidate4;
}

async function addVote4() {
  if (votesLeft > 0) {
    votesLeft = votesLeft - 1;
    candidate4 = candidate4 + 1;
    update4();
    await updateVoteInDB(4, candidate4);
    saveVotesToCookie();
    updateVotesDisplay();
  } else {
    alert(`You've voted your maximum of ${maxVotes} times`);
  }
}
document.querySelector(".cand4_add").onclick = addVote4;

initializeCookiesLeft();
loadVotes();
