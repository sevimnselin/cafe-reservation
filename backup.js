const calendarBody = document.getElementById("calendar-body");
const currentMonthDisplay = document.getElementById("current-month");


window.addEventListener('DOMContentLoaded', () => {
    // Create an instance of Tempus Dominus
    const datepickerElement = document.getElementById('datepicker');

    const datepicker = new tempusDominus.TempusDominus(
        datepickerElement,
        {
            display: {
                viewMode: 'calendar',
                components: {
                    calendar: true,
                    date: true,
                    month: true,
                    year: true,
                    decades: false,
                    clock: false,
                },
                icons: {
                    today: 'bi bi-circle-fill text-primary' // Adds a custom icon for today's date
                }
            },
            allowInputToggle: true, // Enables manual input along with the calendar
            defaultDate: new Date(), // Highlights today's date by default
        }
    );

    // Add toggle button functionality
    document.getElementById('datepicker-toggle').addEventListener('click', () => {
        datepicker.toggle();
    });
    // Functioon to handle date selection
    const onDateSelected = (event) => {
        const selectedDate = event.date;
        console.log('Selected date:', selectedDate);
        // Add any additional functionality here
    };

    // Attach the callback to the date selection event
    datepickerElement.addEventListener('change.td', onDateSelected);
});
/** let currentDate = new Date();

function renderCalendar() {
    calendarBody.innerHTML = "";

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    currentMonthDisplay.textContent = `${firstDay.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`;

    const startDay = (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1);
    let day = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            if (i === 0 && j < startDay) {
                cell.classList.add("disabled");
            } else if (day > lastDay.getDate()) {
                cell.classList.add("disabled");
            } else {
                const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                cell.textContent = day;
                cell.addEventListener("click", () => handleDateClick(dateKey));

                if (j === 0) {
                    cell.classList.add("disabled");
                }

                day++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
        if (day > lastDay.getDate()) break;
    }
} 

function handleDateClick(dateKey) {
    // Redirect to the time.html page and pass the selected date in the query string
    window.location.href = `time.html?date=${dateKey}`;
}

document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);

    if (nextMonth <= new Date().setMonth(new Date().getMonth() + 3)) {
        currentDate = nextMonth;
        renderCalendar();
    }
});

renderCalendar();**/


// INDEX.HTML END

const selectedDateElement = document.getElementById("selected-date");
const timeSlotsContainer = document.getElementById("time-slots");

// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function renderTimeSlots(dateKey) {
    selectedDateElement.textContent = dateKey;

    const timeSlotWrapper = timeSlotsContainer;

    // Loop from 12:00 to 20:00 to generate time slots
    for (let hour = 12; hour <= 20; hour++) {
        const time = `${hour}:00`;

        const slot = document.createElement("button");
        slot.textContent = time;
        slot.classList.add("btn", "btn-outline-success", "m-2");

        // Here you would add logic to check if the slot is already booked
        // For simplicity, let's assume all slots are available
        slot.addEventListener("click", () => bookTimeSlot(dateKey, time));
        timeSlotWrapper.appendChild(slot);
    }
}

function bookTimeSlot(dateKey, time) {
    // Here you could update your system to save the booking
    alert(`You booked ${time} on ${dateKey}`);
    window.location.href = "confirmation.html"; // Redirect to confirmation page or something similar
}

// Get the selected date from the URL and render the time slots
const selectedDate = getQueryParam("date");
if (selectedDate) {
    renderTimeSlots(selectedDate);
}
