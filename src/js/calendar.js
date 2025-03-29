document.addEventListener("DOMContentLoaded", () => {
    const calendarDays = document.querySelector(".calendar-grid");
    const calendarHeader = document.querySelector(".calendar-header");
    const dayHeaders = document.querySelector(".day-headers");
    const monthSelector = document.getElementById("month-selector");
    const yearSelector = document.getElementById("year-selector");
    const calendarFlip = document.querySelector(".calendar-flip");
    const flipBackButton = document.querySelector(".flip-back");
    const expenseDetails = document.getElementById("expense-details");
    const totalSpentDisplay = document.getElementById("total-spent"); 

    let currentDate = new Date();

    //data for February 2025
    const expensesData = {
        3: [{ name: "Coffee", amount: 4.50 }, { name: "Lunch", amount: 12.30 }],
        7: [{ name: "Train Ticket", amount: 2.80 }, { name: "Groceries", amount: 30.00 }],
        12: [{ name: "Movie Ticket", amount: 9.99 }, { name: "Popcorn", amount: 5.00 }],
        14: [{ name: "Valentine's Dinner", amount: 50.00 }, { name: "Gift", amount: 20.00 }],
        18: [{ name: "Gym Membership", amount: 40.00 }],
        22: [{ name: "Taxi Fare", amount: 15.50 }, { name: "Coffee", amount: 4.20 }],
        25: [{ name: "Concert Ticket", amount: 75.00 }],
        28: [{ name: "Streaming Subscription", amount: 10.99 }]
    };

    function populateSelectors() {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        monthSelector.innerHTML = "";
        months.forEach((month, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.innerText = month;
            if (index === currentDate.getMonth()) option.selected = true;
            monthSelector.appendChild(option);
        });

        yearSelector.innerHTML = "";
        for (let year = 2000; year <= 2050; year++) {
            const option = document.createElement("option");
            option.value = year;
            option.innerText = year;
            if (year === currentDate.getFullYear()) option.selected = true;
            yearSelector.appendChild(option);
        }
    }

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

    function generateCalendar() {
        calendarDays.innerHTML = "";
        const year = parseInt(yearSelector.value);
        const month = parseInt(monthSelector.value);
        currentDate.setFullYear(year);
        currentDate.setMonth(month);

        calendarHeader.innerText = `${monthSelector.options[monthSelector.selectedIndex].text} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("empty");
            calendarDays.appendChild(emptyCell);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayCell = document.createElement("div");
            dayCell.classList.add("day");
            dayCell.innerHTML = `<strong>${String(day).padStart(2, '0')}</strong>`;
            dayCell.addEventListener("click", () => flipToExpenses(day));

            if (day === todayDate && month === todayMonth && year === todayYear) {
                dayCell.classList.add("today");
            }

            if (month === 1 && expensesData[day]) { //only for February
                const expenseDot = document.createElement("div");
                expenseDot.classList.add("expense-indicator");
                dayCell.appendChild(expenseDot);
            }

            calendarDays.appendChild(dayCell);
        }

        updateTotalSpent();
    }

    function flipToExpenses(day) {
        const expenses = expensesData[day] || [];
        const monthText = monthSelector.options[monthSelector.selectedIndex].text;
        const yearText = yearSelector.value;
    
        expenseDetails.innerHTML = "";  
    
        let expensesHTML = `
            <p class="expenses-date">Expenses for ${day} ${monthText} ${yearText}</p>
        `;
    
        if (expenses.length > 0) {
            expensesHTML += `<ul class="expense-list">`;
            expenses.forEach(exp => {
                expensesHTML += `<li>${exp.name} - <span class="expense-amount">$${exp.amount.toFixed(2)}</span></li>`;
            });
            expensesHTML += `</ul>`;
        } else {
            expensesHTML += `<p class="no-expenses">No expenses recorded for this day.</p>`;
        }
    
        //set content once
        expenseDetails.innerHTML = expensesHTML;
    
        calendarFlip.classList.add("flipped");
    }
    
    


    function updateTotalSpent() {
        const selectedMonth = parseInt(monthSelector.value);
        let totalSpent = 0;

        if (selectedMonth === 1) { //
            Object.values(expensesData).forEach(expenses => {
                expenses.forEach(exp => {
                    totalSpent += exp.amount;
                });
            });
        }

        totalSpentDisplay.innerHTML = `$${totalSpent.toFixed(2)}`;
    }

    flipBackButton.addEventListener("click", () => {
        calendarFlip.classList.remove("flipped");
    });

    monthSelector.addEventListener("change", generateCalendar);
    yearSelector.addEventListener("change", generateCalendar);

    populateSelectors();
    createDayHeaders();
    generateCalendar();
});
