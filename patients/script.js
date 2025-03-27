

// Description: This file contains the javascript code for the patients page.

    const modalBackdrop = document.getElementById('modal-backdrop');
    const toggleButton = document.querySelector('.toggle-modal');
    const closeButton = document.getElementById('close-modal');
    const cancelButton = document.getElementById('cancel-modal');
    

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


document.getElementById('save-modal').addEventListener('click', function () {
    // Obtén los valores de los campos del formulario
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Verifica que los campos requeridos no estén vacíos
    if (!firstName || !lastName || !email || !phone) {
        alert('Please fill in all required fields.');
        return;
    }

    // Obtén el cuerpo de la tabla
    const tableBody = document.querySelector('.table__body tbody');

    // Crea una nueva fila
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${tableBody.rows.length + 1}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>Dr. Andrew Taylor</td>
        <td>
            <button onclick="editPatient(this)" style="background: none; border: none; cursor: pointer;">
                <img src="../patients/images/pencil.svg" alt="EDIT">
            </button>
        </td>
        <td>
            <button style="background: none; border: none; cursor: pointer;">
                <img src="../patients/images/eye.svg" alt="VIEW">
            </button>
        </td>
        <td>
            <button style="background: none; border: none; cursor: pointer;">
                <img src="../patients/images/trash3.svg" alt="DELETE">
            </button>
        </td>
    `;

    // Agrega la nueva fila al cuerpo de la tabla
    tableBody.appendChild(newRow);

    // Limpia los campos del formulario
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';

    // Cierra el modal
    document.getElementById('modal-backdrop').style.display = 'none';
});


