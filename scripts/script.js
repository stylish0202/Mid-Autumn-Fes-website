// -----------------------------------------------------------------------------------------------
// Declare variables
// -----------------------------------------------------------------------------------------------
const countDownTimer = document.getElementById("countdownTimer");

// -----------------------------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------------------------
function createCountdownTimer() {
  // Set the date for the countdown
  let countdownDate = new Date("2025-10-06T00:00:00+08:00").getTime();

  function updateTimer() {
    // get today's date and time
    const now = new Date().getTime();
    // find the distance between now and the count down date
    let distance = countdownDate - now;

    // If the count is reached, the following event will happen
    if (distance <= 0) {
      clearInterval(updateEachSecond);
      countDownTimer.innerHTML = "HAPPY MID-AUTUMN FESTIVAL!";
      return;
    }

    // Time calculation for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result using your html element
    countDownTimer.textContent = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} seconds`;
  }

  // Update the countdown each second
  const updateEachSecond = setInterval(updateTimer, 1000);
  // run once straight away
  updateTimer();
}

function flippingCardEffect(cardId, getBackHTML) {
  const card = document.getElementById(cardId);
  if (!card) return;

  const frontHtml = card.innerHTML;
  let isFlipped = false;

  const swap = () => {
    isFlipped = !isFlipped;
    card.innerHTML = isFlipped ? getBackHTML : frontHtml;
  };

  card.addEventListener("click", swap);
  card.setAttribute("role", "button"); // assistive tech
}

// -----------------------------------------------------------------------------------------------
// calling function
// -----------------------------------------------------------------------------------------------
createCountdownTimer();

flippingCardEffect(
  "card1",
  `<div class = "card-body text-center h-100 w-100 fs-3 p-3 text-white d-flex justify-content-center align-items-center" style = "background-color: #403d7c;">
    <p>Warning: Mid-Autumn side effects may include excessive mooncake eating, awkward auntie questions, and hearing the same old family stories—for the 100th time.But hey, that's the charm! It's all about food, laughs, and bonding (whether you like it or not)</p>
  </div>`
);
flippingCardEffect(
  "card2",
  `<div class = "card-body text-center h-100 w-100 fs-3 p-3 text-white d-flex justify-content-center align-items-center" style = "background-color: #403d7c;">
      <p>Here's a mini fun fact for you! Did you know, a single traditional mooncake can pack over 800 calories—that's about the same as three bowls of rice! So while they're delicious, they're best enjoyed in moderation. Don't eat too much! </p>
    </div>`
);
flippingCardEffect(
  "card3",
  `<div class = "card-body text-center h-100 w-100 fs-3 p-3 text-white d-flex justify-content-center align-items-center" style = "background-color: #403d7c;">
      <p>Fun Fact: Lanterns were originally used to light the way for spirits during Mid-Autumn Festival, but over time, they've become colorful symbols of hope, reunion, and wishes for good fortune - some even write their dreams on them before releasing them into the sky!</p>
    </div>`
);
