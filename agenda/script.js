// Selección de elementos
const openModalBtn = document.getElementById('openModalBtn');
const appointmentModal = document.getElementById('appointmentModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const calendarContainer = document.getElementById('calendar');
const monthSelect = document.getElementById('month-select');
const monthDisplay = document.getElementById('month');

// Elementos del formulario
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const mobileNo = document.getElementById('mobileNo');
const appointmentDate = document.getElementById('appointmentDate');
const startTime = document.getElementById('startTime');
const endTime = document.getElementById('endTime');
const consultingDoctor = document.getElementById('consultingDoctor');
const noteInput = document.getElementById('note');

// Almacenamiento de citas
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

// Funciones de modal
function openModal() {
    appointmentModal.style.display = 'flex';
}

function closeModal() {
    appointmentModal.style.display = 'none';
    // Limpiar formulario después de cerrar
    resetForm();
}

function resetForm() {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    mobileNo.value = '';
    appointmentDate.value = '2024-04-25';
    startTime.value = '10:30';
    endTime.value = '11:00';
    consultingDoctor.value = '';
    noteInput.value = '';
}

// Validación de formulario
function validateForm() {
    const requiredFields = [firstName, lastName, email, mobileNo, consultingDoctor];
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });

    return isValid;
}

// Guardar cita
function saveAppointment() {
    if (!validateForm()) {
        alert('Por favor complete todos los campos requeridos');
        return;
    }

    const newAppointment = {
        id: Date.now(), // Identificador único
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        mobileNo: mobileNo.value,
        date: appointmentDate.value,
        startTime: startTime.value,
        endTime: endTime.value,
        doctor: consultingDoctor.value,
        note: noteInput.value
    };

    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    renderCalendar();
    closeModal();
}

// Renderizar calendario con citas
function renderCalendar() {
    const selectedMonth = monthSelect.value;
    const selectedYear = new Date().getFullYear();
    
    // Limpiar contenedor anterior
    calendarContainer.innerHTML = '';

    // Crear estructura de días
    const daysInMonth = new Date(selectedYear, parseInt(selectedMonth) + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;

        // Buscar citas para este día
        const dayAppointments = appointments.filter(app => {
            const appDate = new Date(app.date);
            return appDate.getMonth() == selectedMonth && appDate.getDate() == day;
        });

        // Mostrar número de citas
        if (dayAppointments.length > 0) {
            const appointmentBadge = document.createElement('span');
            appointmentBadge.classList.add('appointment-badge');
            appointmentBadge.textContent = dayAppointments.length;
            dayElement.appendChild(appointmentBadge);

            // Crear mini tarjeta de citas al hacer hover
            dayElement.addEventListener('mouseover', () => {
                const tooltipContainer = document.createElement('div');
                tooltipContainer.classList.add('appointment-tooltip');
                
                dayAppointments.forEach(app => {
                    const appTooltip = document.createElement('div');
                    appTooltip.innerHTML = `
                        <strong>${app.startTime} - ${app.endTime}</strong><br>
                        Dr. ${app.doctor}<br>
                        ${app.firstName} ${app.lastName}
                    `;
                    tooltipContainer.appendChild(appTooltip);
                });

                dayElement.appendChild(tooltipContainer);
            });

            dayElement.addEventListener('mouseout', () => {
                const tooltip = dayElement.querySelector('.appointment-tooltip');
                if (tooltip) tooltip.remove();
            });
        }

        calendarContainer.appendChild(dayElement);
    }
}

// Eventos
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveAppointment);
monthSelect.addEventListener('change', renderCalendar);

// Evento para cerrar modal al hacer clic fuera
appointmentModal.addEventListener('click', function(event) {
    if (event.target === appointmentModal) {
        closeModal();
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Establecer mes actual
    const currentMonth = new Date().getMonth();
    monthSelect.value = currentMonth;
    monthDisplay.textContent = monthSelect.options[currentMonth].text;
    
    renderCalendar();
});