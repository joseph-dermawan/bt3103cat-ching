document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".card").addEventListener("click", flip);
    initializeCalendar();
});

function flip() {
    document.querySelector(".card").classList.toggle("flipped");
}

function initializeCalendar() {
    populateMonthAndYearSelectors();
    updateCalendar();
}

function populateMonthAndYearSelectors() {
    const monthSelector = document.getElementById("monthSelector");
    const yearSelector = document.getElementById("yearSelector");

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    for (let i = 0; i < months.length; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = months[i];
        monthSelector.appendChild(option);
    }

    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        yearSelector.appendChild(option);
    }

    monthSelector.value = new Date().getMonth();
    yearSelector.value = currentYear;
}

function updateCalendar() {
    const monthSelector = document.getElementById("monthSelector");
    const yearSelector = document.getElementById("yearSelector");
    const calendarBody = document.querySelector("#calendarTable tbody");

    let selectedMonth = parseInt(monthSelector.value);
    let selectedYear = parseInt(yearSelector.value);

    let firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    let lastDate = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    firstDay = firstDay === 0 ? 6 : firstDay - 1; // Adjust so Monday is first

    calendarBody.innerHTML = "";
    let row = document.createElement("tr");

    for (let i = 0; i < firstDay; i++) {
        let emptyCell = document.createElement("td");
        row.appendChild(emptyCell);
    }

    for (let date = 1; date <= lastDate; date++) {
        let cell = document.createElement("td");
        cell.textContent = date;
        row.appendChild(cell);

        if ((firstDay + date) % 7 === 0 || date === lastDate) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
    }

    updateCurrentDateDisplay();
}

function updateCurrentDateDisplay() {
    let today = new Date();
    let date = today.getDate();
    let day = today.toLocaleDateString("en-US", { weekday: "long" });
    let monthYear = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    document.getElementById("date-large").textContent = `${date} ${monthYear}`;
    document.getElementById("day-large").textContent = day;
}
