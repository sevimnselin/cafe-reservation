const calendarBody = document.getElementById("calendar-body");
const currentMonthDisplay = document.getElementById("current-month");

window.addEventListener('DOMContentLoaded', () => {
    // Create an instance of Tempus Dominus
    const datepickerElement = document.getElementById('datepicker');
    var selectedDateVal;
    var slotElement;
    var dateAvailable;
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
            restrictions: {
                minDate: new Date(), // Disable dates before today
            },
        }
    );

    // Add toggle button functionality
    document.getElementById('datepicker-toggle').addEventListener('click', () => {
        datepicker.toggle();
    });

    const renderTimeSlots = (data) => {
        dateTimeSlotData = data;
        dateAvailable = false;
        const container = document.getElementById('timePicker');
        container.innerHTML = ''; // Clear any existing content
        if (!dateTimeSlotData || dateTimeSlotData.length === 0) {
            container.innerHTML = '<p class="text-muted">No time slots available.</p>';
            return;
        }

        dateTimeSlotData.forEach(slot => {
            if (slot.Date === selectedDateVal.format('dd-MM-yyyy')) {
                slot.availableSlots.forEach(slotObj => {
                    slotElement = document.createElement('button');
                    slotElement.className = 'btn btn-sm btnSession btn-info';

                    slotElement.textContent = slotObj.timeSlot;
                    slotElement.disabled = !slotObj.availability; // Disable if not available
                    container.appendChild(slotElement);
                    dateAvailable = true;
                });
            }
        });
        if (!dateAvailable) {
            slotElement = document.createElement('div');
            slotElement.className = 'no-time-slots';
            slotElement.textContent = 'Unfortunately we do not have any slots available for this date';
        }
        container.appendChild(slotElement);
        // Select the parent <section> element containing the time slots
        const timeSlotsParent = document.getElementById('timePicker');

        // Get all <button> elements inside the <ul>
        const timeSlotsButtons = timeSlotsParent.querySelectorAll('button.btnSession');
        // Add a click event listener to each <button>
        timeSlotsButtons.forEach(timeSlotsButton => {
            timeSlotsButton.addEventListener('click', (event) => {
                const clickedButton = event.currentTarget; // The button> that was clicked
                document.getElementById('selectedTime').innerHTML = clickedButton.textContent;
                document.getElementById('tab3').click();
            });
        });

    };
    // Fetch timeslot JSON data
    const fetchTimeSlotData = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'timeslots.json', true); // Ensure the JSON file exists in the same directory
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const timeSlotData = JSON.parse(xhr.responseText);
                    console.log('Time Slot Data:', timeSlotData);
                    renderTimeSlots(timeSlotData);
                    // Process the data as needed
                } else {
                    console.error(`Failed to fetch data: ${xhr.statusText}`);
                }
            }
        };
        xhr.send();
    };

    // Functioon to handle date selection
    const onDateSelected = (event) => {
        selectedDateVal = event.detail.date;
        document.getElementById('tab2').click();
        document.getElementById('selectedDate').innerHTML = selectedDateVal.format('MMMM dd');
        fetchTimeSlotData();
        // Add any additional functionality here
    };

    document.getElementById('tab1').addEventListener('click', () => {
        document.getElementById('selectedDate').innerHTML = '';
    });

    // Attach the callback to the date selection event
    datepickerElement.addEventListener('change.td', onDateSelected);


    // Select the parent <section> element containing the guest availability
    const guestAvailabilityParent = document.getElementById('guestSelection');

    // Get all <button> elements inside the <ul>
    const guestAvailabilityButtons = guestAvailabilityParent.querySelectorAll('.persons button');

    // Add a click event listener to each <button>
    guestAvailabilityButtons.forEach(guestAvailabilityButton => {
        guestAvailabilityButton.addEventListener('click', (event) => {
            const clickedGuestButton = event.currentTarget; // The <button> that was clicked
            document.getElementById('selectedPeople').innerHTML = clickedGuestButton.textContent;
            document.getElementById('reservationPersonalInfo').classList.remove('d-none');
            document.getElementById('guestSelection').classList.add('d-none');

        });
    });

    // On click of 'Continue to complete' button, validate form
    document.getElementById('reservationSubmit').addEventListener('click', function () {
        // Get input values
        const firstName = document.getElementById('Firstname').value.trim();
        const lastName = document.getElementById('Lastname').value.trim();
        const phoneNumber = document.getElementById('PhoneNumber').value.trim();
        const email = document.getElementById('EmailAddress').value.trim();
        const allergyRadioBtn = document.querySelector('input[name="AllergiesAlert"]:checked')?.value;
        const allergyDetails = document.getElementById('Note').value.trim();
        const reservationDetails = document.querySelector('input[name="Tags"]:checked')?.value;
        invoiceRequestRadioBtn = document.querySelector('input[name="InvoiceRequest"]:checked')?.value;

        // Get error elements
        const firstNameError = document.getElementById('firstNameError');
        const lastNameError = document.getElementById('lastNameError');
        const phoneNumberError = document.getElementById('phoneNumberError');
        const emailError = document.getElementById('emailError');

        // Initialize validation
        let isValid = true;

        // Validate name
        if (firstName === '') {
            firstNameError.style.display = 'block';
            isValid = false;
        } else {
            firstNameError.style.display = 'none';
        }
        if (lastName === '') {
            lastNameError.style.display = 'block';
            isValid = false;
        } else {
            lastNameError.style.display = 'none';
        }
        if (phoneNumber === '') {
            phoneNumberError.style.display = 'block';
            isValid = false;
        } else {
            phoneNumberError.style.display = 'none';
        }
        if (email === '') {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Handle overall validation result
        if (isValid) {
            document.getElementById('tab4').click();
        }
    });

});
