document.getElementById('month-select').addEventListener('change', function() {
    const selectedMonth = parseInt(this.value);
    updateCalendar(selectedMonth);
});

function updateCalendar(month) {
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day');
        calendar.appendChild(emptyDay);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    }
}

// Initialize the calendar with the current month
const currentMonth = new Date().getMonth();
document.getElementById('month-select').value = currentMonth;
updateCalendar(currentMonth);