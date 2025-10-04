console.log("Hi there!");

const maxVotes = 5;
let votesLeft = maxVotes;

// classes related to these are written as "cand#"
let candidate1 = 0;
let candidate2 = 0;
let candidate3 = 0;
let candidate4 = 0;

//Functions for cand1 below

function update1() {
  let elem = document.querySelector(".cand1_value");
  elem.innerText = candidate1;
}

function addVote1() {
  if (votesLeft >= 1) {
    votesLeft = votesLeft - 1;
    candidate1 = candidate1 + 1;
    update1();
  } else alert("You've voted your maximum of ${maxVotes} times");
}
document.querySelector(".cand1_add").onclick = addVote1;

//Functions for cand2 below
function update2() {
  let elem = document.querySelector(".cand2_value");
  elem.innerText = candidate2;
}

function addVote2() {
  if (votesLeft >= 1) {
    votesLeft = votesLeft - 1;
    candidate2 = candidate2 + 1;
    update2();
  } else alert("You've reached your maximum votes!");
}

document.querySelector(".cand2_add").onclick = addVote2;

//Functions for cand3 below
function update3() {
  let elem = document.querySelector(".cand3_value");
  elem.innerText = candidate3;
}

function addVote3() {
  if (votesLeft >= 1) {
    votesLeft = votesLeft - 1;
    candidate3 = candidate3 + 1;
    update3();
  } else alert("You've reached your maximum votes!");
}

document.querySelector(".cand3_add").onclick = addVote3;

//Functions for cand4 below
function update4() {
  let elem = document.querySelector(".cand4_value");
  elem.innerText = candidate4;
}

function addVote4() {
  if (votesLeft >= 1) {
    votesLeft = votesLeft - 1;
    candidate4 = candidate4 + 1;
    update4();
  } else alert("You've reached your maximum votes!");
}

document.querySelector(".cand4_add").onclick = addVote4;
