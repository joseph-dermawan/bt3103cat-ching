document.addEventListener("DOMContentLoaded", () => {
    const calendarDays = document.querySelector(".calendar-grid");
    const calendarHeader = document.querySelector(".calendar-header");
    const dayHeaders = document.querySelector(".day-headers");
    const monthSelector = document.getElementById("month-selector");
    const yearSelector = document.getElementById("year-selector");
    const calendarFlip = document.querySelector(".calendar-flip");
    const flipBackButton = document.querySelector(".flip-back");
    const expenseDetails = document.getElementById("expense-details");

    let currentDate = new Date();

    // Populate Month and Year Selectors
    function populateSelectors() {
        const months = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

        // Populate months
        monthSelector.innerHTML = "";
        months.forEach((month, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.innerText = month;
            if (index === currentDate.getMonth()) option.selected = true;
            monthSelector.appendChild(option);
        });

        // Populate years (2000 - 2050)
        yearSelector.innerHTML = "";
        for (let year = 2000; year <= 2050; year++) {
            const option = document.createElement("option");
            option.value = year;
            option.innerText = year;
            if (year === currentDate.getFullYear()) option.selected = true;
            yearSelector.appendChild(option);
        }
    }

    // Generate Day Headers
    function createDayHeaders() {
        dayHeaders.innerHTML = "";
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        days.forEach(day => {
            const header = document.createElement("div");
            header.classList.add("day-header");
            header.innerText = day;
            dayHeaders.appendChild(header);
        });
    }

    // Generate Calendar Days
    function generateCalendar() {
        calendarDays.innerHTML = "";
        const year = parseInt(yearSelector.value);
        const month = parseInt(monthSelector.value);
        currentDate.setFullYear(year);
        currentDate.setMonth(month);

        // Update Month Header
        calendarHeader.innerText = `${monthSelector.options[monthSelector.selectedIndex].text} ${year}`;

        const firstDay = new Date(year, month, 1).getDay(); // Get weekday index (0=Sun, 6=Sat)
        const totalDays = new Date(year, month + 1, 0).getDate(); // Get total days in month

        // Today's Date Highlight
        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        // Create Empty Cells for Alignment
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("empty");
            calendarDays.appendChild(emptyCell);
        }

        // Create Actual Calendar Days
        for (let day = 1; day <= totalDays; day++) {
            const dayCell = document.createElement("div");
            dayCell.classList.add("day");
            dayCell.innerHTML = `<strong>${String(day).padStart(2, '0')}</strong>`;
            dayCell.addEventListener("click", () => flipToExpenses(day));

            // Highlight today's date
            if (day === todayDate && month === todayMonth && year === todayYear) {
                dayCell.classList.add("today");
            }

            calendarDays.appendChild(dayCell);
        }
    }

    // Flip Calendar to Show Expenses
    function flipToExpenses(day) {
        expenseDetails.innerText = `Expenses for ${day} ${monthSelector.options[monthSelector.selectedIndex].text} ${yearSelector.value}`;
        calendarFlip.classList.add("flipped");
    }

    // Flip Back to Calendar View
    flipBackButton.addEventListener("click", () => {
        calendarFlip.classList.remove("flipped");
    });

    // Change Month or Year
    monthSelector.addEventListener("change", generateCalendar);
    yearSelector.addEventListener("change", generateCalendar);

    // Initialize
    populateSelectors();
    createDayHeaders();
    generateCalendar();
});
