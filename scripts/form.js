// --------------------------------------------------------------------------------------------------------------
// declaring variable names
// --------------------------------------------------------------------------------------------------------------
const formElement = document.querySelector("#feedbackForm");
const textArea = document.getElementById("textarea");
const charCount = document.getElementById("charCount");
const moodValue = document.getElementById("moodValue");
const rangeMood = document.getElementById("rangeMood");
const otherActivity = document.getElementById("otherActivity");
const expFeedback = document.getElementById("experienceFeedback");
const actFeedback = document.getElementById("activitiesFeedback");
const experienceRadios = Array.from(
  document.querySelectorAll('input[name="experience"]') // collects all your radio buttons into a normal array
);
const activityChecks = Array.from(
  document.querySelectorAll('input[name="activities"]') // collects all checkboxes into a normal array
);

let triedToSubmit = false;

// --------------------------------------------------------------------------------------------------------------
// creating functions
// --------------------------------------------------------------------------------------------------------------

// textarea character counter color change when near limit
function textAreaEdit() {
  textArea.addEventListener("input", () => {
    const currentLength = textArea.value.length;
    charCount.textContent = `${currentLength} / 300`;
    charCount.classList.toggle("text-danger", currentLength > 280);
    charCount.classList.toggle("text-muted", currentLength <= 280);
  });
}

// Output for Range
function updateMood() {
  moodValue.textContent = rangeMood.value;
}

// check validity for radios
function validateExperience() {
  const ok = experienceRadios.some((r) => r.checked);
  experienceRadios.forEach((r) =>
    r.classList.toggle("is-invalid", triedToSubmit && !ok)
  );
  expFeedback.textContent =
    triedToSubmit && !ok ? "Please choose one option." : "";
  return ok;
}

// check validity for checkboxes
function validateActivities() {
  const ok =
    activityChecks.some((c) => c.checked) ||
    otherActivity.value.trim().length > 0;
  actFeedback.textContent =
    triedToSubmit && !ok
      ? "Select at least one activity or fill in “Other”."
      : "";
  return ok;
}

// handling events if I click the submit button
formElement.addEventListener("submit", (e) => {
  triedToSubmit = true;
  const groupsOK = validateActivities() && validateExperience();
  const fieldsOK = formElement.checkValidity();
  formElement.classList.add("was-validated");

  // prevent forms to submit if either group's validation fails
  if (!groupsOK || !fieldsOK) {
    e.preventDefault();
    return;
  }

  e.preventDefault();
  formElement.outerHTML = `
    <div class="text-center">
      <h1 class="display-4 text-success fw-bold">&#x1F389; Thank you!</h1>
      <p class="fs-4">We appreciate your Mid-Autumn Festival story!</p>
      <a href="index.html" class="btn btn-primary btn-lg">Click here to return to the Home page</a>
    </div>`;
});

// this part activates each time an input is detected...
formElement.addEventListener("input", (e) => {
  if (!triedToSubmit) return; // this avoids error before we even click on the submit button
  if (e.target.name === "experience") validateExperience(); // if radio button is clicked, rerun this function
  if (e.target.name === "activities" || e.target.id === "otherActivity")
    validateActivities();
});

// this one is just for backup for radios due to input being weird sometimes
formElement.addEventListener("change", (e) => {
  if (!triedToSubmit) return;
  if (e.target.name === "experience") validateExperience();
});

// --------------------------------------------------------------------------------------------------------------
// calling functions
// --------------------------------------------------------------------------------------------------------------
textAreaEdit();
rangeMood.addEventListener("input", updateMood);
updateMood();
