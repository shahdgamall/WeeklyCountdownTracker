function formatTimeUnit(unit) {
  return unit < 10 ? "0" + unit : unit;
}

function formatTimeRemaining(milliseconds) {
  // Convert to positive if negative
  milliseconds = Math.abs(milliseconds);

  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  // Calculate total hours (including days converted to hours)
  const totalHours = Math.floor(milliseconds / (1000 * 60 * 60));

  return {
    totalHours: formatTimeUnit(totalHours),
    minutes: formatTimeUnit(minutes),
    seconds: formatTimeUnit(seconds),
  };
}

function updateCountdownFullWeek() {
  const startDayIndex = parseInt(document.getElementById("startDay").value);
  const endDayIndex = parseInt(document.getElementById("endDay").value);
  const countdownElement = document.getElementById("countdown");

  const now = new Date();
  const currentDayIndex = now.getDay();

  let daysUntilStart = (startDayIndex - currentDayIndex + 7) % 7;

  if (
    daysUntilStart === 0 &&
    (now.getHours() > 0 || now.getMinutes() > 0 || now.getSeconds() > 0)
  ) {
    daysUntilStart = 7;
  }

  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() + daysUntilStart);
  startDate.setHours(0, 0, 0, 0);

  let daysBetween = (endDayIndex - startDayIndex + 7) % 7;
  if (daysBetween === 0) {
    daysBetween = 7;
  }

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + daysBetween);

  endDate.setHours(23, 59, 59, 999);

  if (now < startDate) {
    const timeUntilStart = startDate.getTime() - now.getTime();
    const timeFormatted = formatTimeRemaining(timeUntilStart);

    countdownElement.innerHTML = `
      <div class="time-block">
        <span class="time">${timeFormatted.totalHours}</span>
        <span class="label">ساعة</span>
      </div>
      <div class="time-block">
        <span class="time">${timeFormatted.minutes}</span>
        <span class="label">دقيقة</span>
      </div>
      <div class="time-block">
        <span class="time">${timeFormatted.seconds}</span>
        <span class="label">ثانية</span>
      </div>
    `;
  } else if (now < endDate) {
    const timeUntilEnd = endDate.getTime() - now.getTime();
    const timeFormatted = formatTimeRemaining(timeUntilEnd);

    countdownElement.innerHTML = `
      <div class="time-block">
        <span class="time">${timeFormatted.totalHours}</span>
        <span class="label">ساعة</span>
      </div>
      <div class="time-block">
        <span class="time">${timeFormatted.minutes}</span>
        <span class="label">دقيقة</span>
      </div>
      <div class="time-block">
        <span class="time">${timeFormatted.seconds}</span>
        <span class="label">ثانية</span>
      </div>
    `;
  } else {
    startDate.setDate(startDate.getDate() + 7);
    endDate.setDate(endDate.getDate() + 7);

    const timeUntilNextStart = startDate.getTime() - now.getTime();
    const timeFormatted = formatTimeRemaining(timeUntilNextStart);

    countdownElement.innerHTML = `
      <div class="time-block">
        <span class="time">${timeFormatted.totalHours}</span>
        <span class="label">ساعة</span>
      </div>
      <div class="time-block">
        <span class="time">${timeFormatted.minutes}</span>
        <span class="label">دقيقة</span>
      </div>
      <div class="time-block">
        <span class="time">${timeFormatted.seconds}</span>
        <span class="label">ثانية</span>
      </div>
    `;
  }
}

function updateCountdownToDay() {
  const targetDayIndex = parseInt(document.getElementById("targetDay").value);
  const countdownElement = document.getElementById("countdown");

  const now = new Date();
  const currentDayIndex = now.getDay();

  let daysToAdd = (targetDayIndex - currentDayIndex + 7) % 7;
  if (daysToAdd === 0) {
    daysToAdd = 7;
  }

  const targetDate = new Date(now);
  targetDate.setDate(targetDate.getDate() + daysToAdd);

  targetDate.setHours(0, 0, 0, 0);

  const timeUntilTarget = targetDate.getTime() - now.getTime();
  const timeFormatted = formatTimeRemaining(timeUntilTarget);

  countdownElement.innerHTML = `
    <div class="time-block">
      <span class="time">${timeFormatted.totalHours}</span>
      <span class="label">ساعة</span>
    </div>
    <div class="time-block">
      <span class="time">${timeFormatted.minutes}</span>
      <span class="label">دقيقة</span>
    </div>
    <div class="time-block">
      <span class="time">${timeFormatted.seconds}</span>
      <span class="label">ثانية</span>
    </div>
  `;
}
const sayings = [
  "يا ابن آدم، إنما أنت أيام، كلما ذهب يوم ذهب بعضك. – الحسن البصري",
  "إضاعة الوقت أشد من الموت، لأن إضاعة الوقت تقطعك عن الله والدار الآخرة. – ابن القيم",
  "ما ندمت على شيء ندمي على يوم غربت شمسه... – ابن مسعود",
  "أعرف الناس بالله، أشدهم تعظيمًا لوقته. – الفضيل بن عياض",
  "ينبغي للإنسان أن يعرف شرف زمانه... – ابن الجوزي",
  "الوقت كالسيف، إن لم تقطعه قطعك. – الإمام الشافعي",
];
const today = new Date().getDay();
const messageElement = document.getElementById("message");
messageElement.textContent = sayings[today % sayings.length];

let currentInterval;
function switchMode() {
  const mode = parseInt(document.getElementById("mode").value);

  document.getElementById("fullWeekInputs").style.display =
    mode === 1 ? "block" : "none";
  document.getElementById("singleDayInput").style.display =
    mode === 2 ? "block" : "none";

  clearInterval(currentInterval);
  if (mode === 1) {
    currentInterval = setInterval(updateCountdownFullWeek, 1000);
    updateCountdownFullWeek();
  } else {
    currentInterval = setInterval(updateCountdownToDay, 1000);
    updateCountdownToDay();
  }
}

window.onload = function () {
  switchMode();

  document
    .getElementById("startDay")
    .addEventListener("change", updateCountdownFullWeek);
  document
    .getElementById("endDay")
    .addEventListener("change", updateCountdownFullWeek);
  document
    .getElementById("targetDay")
    .addEventListener("change", updateCountdownToDay);
};
