
// DOM elements
const modalBackdrop = document.getElementById('modal-backdrop');
const toggleButton = document.querySelector('.toggle-modal');
const closeButton = document.getElementById('close-modal');
const cancelButton = document.getElementById('cancel-modal');
const dateInputs = document.querySelectorAll('.form-control[value*="2000"], .form-control[value*="2025"]');
const calendar = document.getElementById('date-calendar');

// Show modal function
function showModal() {
    modalBackdrop.style.display = 'flex';
    // Add animation class if desired
    setTimeout(() => {
        modalBackdrop.style.opacity = '1';
    }, 10);
}

// Hide modal function
function hideModal() {
    modalBackdrop.style.opacity = '0';
    setTimeout(() => {
        modalBackdrop.style.display = 'none';
        // Hide calendar if it's open
        calendar.style.display = 'none';
    }, 300);
}

// Toggle calendar
function toggleCalendar(e) {
    const inputRect = e.target.getBoundingClientRect();
    
    // Position the calendar under the input
    calendar.style.top = `${inputRect.bottom + window.scrollY}px`;
    calendar.style.left = `${inputRect.left + window.scrollX}px`;
    
    // Toggle display
    if (calendar.style.display === 'none' || !calendar.style.display) {
        calendar.style.display = 'block';
    } else {
        calendar.style.display = 'none';
    }
}

// Event listeners
toggleButton.addEventListener('click', showModal);
closeButton.addEventListener('click', hideModal);
cancelButton.addEventListener('click', hideModal);

// Close when clicking outside the modal
modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
        hideModal();
    }
});

// Date input calendar toggle
dateInputs.forEach(input => {
    input.addEventListener('click', toggleCalendar);
});

// Calendar day selection
const calendarDays = document.querySelectorAll('.calendar-day');
calendarDays.forEach(day => {
    day.addEventListener('click', () => {
        // In a real app, you would update the active input with the selected date
        // For demo purposes, just hide the calendar
        calendar.style.display = 'none';
    });
});

// Auto-open modal when page loads for demo
// document.addEventListener('DOMContentLoaded', () => {
//     setTimeout(showModal, 500);
// });