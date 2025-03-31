
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

// Print function 
// Esperar a que se carguen las librerías y el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Asignar el evento al botón
    document.querySelector('button[type="button"]').addEventListener('click', generatePDF);
});

// Función para generar el PDF (mover todo el código de la función aquí)
function generatePDF() {
    // Obtener los valores del formulario
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const checkInDate = document.getElementById('checkInDate').value;
    const doctor = document.getElementById('doctor').value;
    const condition = document.getElementById('condition').value;
    const allergies = document.getElementById('allergies').value;
    const indications = document.getElementById('indications').value;
    const treatment = document.getElementById('treatment').value;

    // Validar que todos los campos requeridos estén completos
    if (!firstName || !lastName || !dob || !age || !gender || !checkInDate || !doctor || !condition || !indications || !treatment) {
        alert('Por favor complete todos los campos requeridos');
        return;
    }

    // Crear el PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Logo y encabezado (puedes personalizar esto)
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('CONSULTORIO MÉDICO', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Dr. ' + doctor, 105, 30, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text('Tel: 555-1234 • Dirección: Calle Principal 123', 105, 36, { align: 'center' });
    
    // Línea divisoria
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 42, 190, 42);
    
    // Título del documento
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 150);
    doc.setFont('helvetica', 'bold');
    doc.text('RECETA MÉDICA', 105, 52, { align: 'center' });
    
    // Información del paciente
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    doc.text(`Paciente: ${firstName} ${lastName}`, 20, 65);
    doc.text(`Fecha de Nacimiento: ${formatDate(dob)}`, 20, 75);
    doc.text(`Edad: ${age} años`, 20, 85);
    doc.text(`Género: ${gender}`, 20, 95);
    doc.text(`Fecha de Consulta: ${formatDate(checkInDate)}`, 120, 65);
    
    // Diagnóstico
    doc.setFont('helvetica', 'bold');
    doc.text('Diagnóstico:', 20, 110);
    doc.setFont('helvetica', 'normal');
    doc.text(condition, 50, 110);
    
    // Alergias si existen
    if (allergies) {
        doc.setFont('helvetica', 'bold');
        doc.text('Alergias:', 20, 120);
        doc.setFont('helvetica', 'normal');
        doc.text(allergies, 50, 120);
    }
    
    // Indicaciones generales
    doc.setFont('helvetica', 'bold');
    doc.text('Indicaciones Generales:', 20, 140);
    doc.setFont('helvetica', 'normal');
    const splitIndications = doc.splitTextToSize(indications, 170);
    doc.text(splitIndications, 20, 150);
    
    // Tratamiento
    doc.setFont('helvetica', 'bold');
    doc.text('Tratamiento:', 20, 170);
    doc.setFont('helvetica', 'normal');
    const splitTreatment = doc.splitTextToSize(treatment, 170);
    doc.text(splitTreatment, 20, 180);
    
    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Firma del Médico: _________________________', 20, 260);
    doc.text('Sello y Cédula Profesional', 150, 260);
    
    // Guardar el PDF
    doc.save(`Receta_${lastName}_${firstName}.pdf`);
}

// Función para formatear la fecha (debe estar disponible en el mismo ámbito)
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
}