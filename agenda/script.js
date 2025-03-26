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



// Seleccionar elementos
const openModalBtn = document.getElementById('openModalBtn');
const appointmentModal = document.getElementById('appointmentModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');

// Funciones para mostrar/ocultar modal
function openModal() {
    appointmentModal.style.display = 'flex';
}

function closeModal() {
    appointmentModal.style.display = 'none';
}

// Event listeners
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

saveBtn.addEventListener('click', function() {
    // Aquí podrías agregar lógica de validación o envío de formulario
    alert('Cita guardada');
    closeModal();
});

// Cerrar modal si se hace clic fuera de él
appointmentModal.addEventListener('click', function(event) {
    if (event.target === appointmentModal) {
        closeModal();
    }
});