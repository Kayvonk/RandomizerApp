let idealGroupSize = 5;
let groupComposition;

let studentsArray = [
  "Student 1",
  "Student 2",
  "Student 3",
  "Student 4",
  "Student 5",
  "Student 6",
  "Student 7",
  "Student 8",
  "Student 9",
];

let allTeams = [];

let totalStudents = studentsArray.length;
console.log("Total Number Of Students:", studentsArray.length);

let startBtn = document.getElementById("startBtn");
let startBtnContainer = document.getElementById("startBtnContainer");
let groupOptions = document.getElementById("groupOptions");
let totalStudentCount = document.getElementById("totalStudentCount");
let groupSizeInput = document.getElementById("groupSizeInput");
let groupDetails = document.getElementById("groupDetails");
let groupCount = document.getElementById("groupCount");
let sliderInput = document.getElementById("sliderInput");
let minValue = document.getElementById("minValue");
let maxValue = document.getElementById("maxValue");
let sliderMenu = document.getElementById("sliderMenu");
let sliderContainer = document.getElementById("sliderContainer");
let groupPreview = document.getElementById("groupPreview");
let groupsOutputContainer = document.getElementById("groupsOutputContainer");
let groupsOutput = document.getElementById("groupsOutput");

totalStudentCount.textContent = "Total # of students: " + studentsArray.length;

groupSizeInput.addEventListener("change", function () {
  handleSlider();
});

sliderInput.addEventListener("click", function () {
  handleSlider();
});

startBtn.addEventListener("click", function () {
  groupOptions.style.display = "none";
  startBtn.style.display = "none";
  startBtnContainer.style.display = "none";
  let allGroups = getGroups();
  groupsOutputContainer.style.display = "flex";
  displayTeams(allGroups);
});

function displayTeams(allTeams) {
  console.log("Output:", allTeams);
  if (allTeams?.length <= 0) {
    return;
  }
  allTeams.map((team, index) => {
    let teamCard = document.createElement("div");
    teamCard.className = "teamCard";
    teamCard.addEventListener("click", function () {
      this.classList.add("animateCard");
    });
    let cardHeader = document.createElement("h2");
    cardHeader.textContent = "Group " + (index + 1);
    teamCard.append(cardHeader);
    let groupMembers = document.createElement("div");
    team.map((memberName) => {
      let teamMember = document.createElement("p");
      teamMember.textContent = memberName;
      groupMembers.append(teamMember);
    });
    teamCard.append(groupMembers);
    groupsOutput.append(teamCard);
  });
}

function getGroups() {
  if (groupComposition?.length <= 0) {
    return;
  }
  console.log("Number of Groups:", groupComposition?.length);
  for (let i = 0; i < groupComposition.length; i++) {
    let team = [];
    for (let j = 0; j < groupComposition[i]; j++) {
      let randomStudent =
        studentsArray[Math.floor(Math.random() * studentsArray.length)];
      team.push(randomStudent);
      studentsArray = studentsArray.filter(
        (student) => student !== randomStudent
      );
    }
    allTeams.push(team);
  }
  // console.log(allTeams);
  return allTeams;
}
function handleSlider() {
  minNumberOfGroups = Math.ceil(totalStudents / parseInt(groupSizeInput.value));

  sliderInput.setAttribute("min", minNumberOfGroups);
  sliderInput.setAttribute("max", minNumberOfGroups + 2);
  sliderInput.setAttribute("value", minNumberOfGroups);

  minValue.textContent = minNumberOfGroups;
  maxValue.textContent = minNumberOfGroups + 2;

  // console.log(groupSizeInput.value);

  sliderContainer.style.display = "flex";

  groupCount.textContent = "Minimum # of groups: " + minNumberOfGroups;

  groupComposition = getPossibleGroups(
    minNumberOfGroups,
    parseInt(groupSizeInput.value)
  );

  // console.log("groupComposition:", groupComposition);

  if (groupComposition?.length > 0) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
  }

  if (
    groupComposition?.length > 0 &&
    groupComposition.every((item) => item === groupComposition[0])
  ) {
    groupPreview.textContent =
      "This would create " +
      groupComposition.length +
      " group(s) of " +
      groupComposition[0];
  } else if (groupComposition?.length > 0) {
    let groupsOfTargetSize = groupComposition.filter(
      (item) => item === parseInt(groupSizeInput.value)
    );
    let groupsRemaining = groupComposition.filter(
      (item) => item === parseInt(groupSizeInput.value - 1)
    );
    groupPreview.textContent =
      "This would create " +
      groupsOfTargetSize.length +
      " group(s) of " +
      groupsOfTargetSize[0] +
      " and " +
      groupsRemaining.length +
      " group(s) of " +
      groupsRemaining[0];
  } else if (groupComposition?.length === 0) {
    groupPreview.textContent =
      "This combination didn't work out. Please try another.";
  }
}

function getPossibleGroups(minNumberOfGroups, targetGroupSize) {
  let groupSizes = [];
  if (totalStudents % targetGroupSize === 0) {
    // console.log("Option 1");
    // Checks whether the target group size evenly divides into the total students
    for (let i = 0; i < minNumberOfGroups; i++) {
      groupSizes.push(targetGroupSize);
    }
  } else if (
    targetGroupSize - 1 + targetGroupSize * (sliderInput.value - 1) ===
    totalStudents
  ) {
    // Checks whether 1 group with 1 less student than the target group size would work
    // console.log("Option 2");
    groupSizes.unshift(targetGroupSize - 1);

    for (let i = 0; i < sliderInput.value - 1; i++) {
      groupSizes.unshift(targetGroupSize);
    }
  } else if (
    (targetGroupSize - 1) * 2 + targetGroupSize * (sliderInput.value - 2) ===
    totalStudents
  ) {
    // Checks whether 2 groups with 1 less student than the target group size would work
    // console.log("Option 3");
    for (let j = 0; j < 2; j++) {
      groupSizes.unshift(targetGroupSize - 1);
    }
    for (let i = 0; i < sliderInput.value - 2; i++) {
      groupSizes.unshift(targetGroupSize);
    }
  } else if (
    (targetGroupSize - 1) * 3 + targetGroupSize * (sliderInput.value - 3) ===
    totalStudents
  ) {
    // Checks whether 3 groups with 1 less student than the target group size would work
    // console.log("Option 4");
    for (let i = 0; i < 3; i++) {
      groupSizes.unshift(targetGroupSize - 1);
    }
    for (let j = 0; j < sliderInput.value - 3; j++) {
      groupSizes.unshift(targetGroupSize);
    }
  } else if (
    (targetGroupSize - 1) * 4 + targetGroupSize * (sliderInput.value - 4) ===
    totalStudents
  ) {
    // Checks whether 4 groups with 1 less student than the target group size would work
    // console.log("Option 5");
    for (let j = 0; j < 4; j++) {
      groupSizes.unshift(targetGroupSize - 1);
    }
    for (let i = 0; i < sliderInput.value - 4; i++) {
      groupSizes.unshift(targetGroupSize);
    }
  }

  return groupSizes;
}
