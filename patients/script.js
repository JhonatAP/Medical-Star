//Abre la ventana de añadir paciente
var modal = document.getElementById("formModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function addPatientToTable() {
    // Obtener los valores del formulario
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const dob = document.getElementById("dob").value;
    const checkInDate = document.getElementById("checkInDate").value;
    const email = document.getElementById("email").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const consultingDoctor = document.getElementById("consultingDoctor").value;

    // Obtener el cuerpo de la tabla
    const tableBody = document.querySelector(".table__body tbody");

    // Crear una nueva fila
    const newRow = document.createElement("tr");

    // Agregar celdas a la fila
    newRow.innerHTML = `
        <td>${tableBody.rows.length + 1}</td>
        <td>${checkInDate}</td>
        <td>${firstName} ${lastName}</td>
        <td>${email}</td>
        <td>${mobileNumber}</td>
        <td>${consultingDoctor}</td>
        <td><img src="../patients/images/pencil.svg" alt="EDIT"></td>
    `;

    // Agregar la fila a la tabla
    tableBody.appendChild(newRow);

    // Cerrar el modal
    modal.style.display = "none";

    // Limpiar el formulario
    document.getElementById("formModal").querySelectorAll("input, select").forEach(input => input.value = "");
}

// Función para editar un paciente
    function editPatient(button) {
        // Obtener la fila del botón clicado
        const row = button.closest("tr");
        const cells = row.querySelectorAll("td");

        // Obtener los datos de la fila
        const id = cells[0].textContent;
        const checkInDate = cells[1].textContent;
        const patientName = cells[2].textContent.split(" ");
        const email = cells[3].textContent;
        const phone = cells[4].textContent;
        const doctor = cells[5].textContent;

        // Dividir el nombre en nombre y apellido
        const firstName = patientName[0];
        const lastName = patientName[1];

        // Rellenar los campos del formulario
        document.getElementById("firstName").value = firstName;
        document.getElementById("lastName").value = lastName;
        document.getElementById("checkInDate").value = checkInDate;
        document.getElementById("email").value = email;
        document.getElementById("mobileNumber").value = phone;
        document.getElementById("consultingDoctor").value = doctor;

        // Mostrar el modal
        const modal = document.getElementById("formModal");
        modal.style.display = "block";
    }

    // Función para cerrar el modal
    function closeModal() {
        const modal = document.getElementById("formModal");
        modal.style.display = "none";
    }

    // Función para guardar los cambios
    function savePatient() {
        // Obtener los valores del formulario
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const checkInDate = document.getElementById("checkInDate").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("mobileNumber").value;
        const doctor = document.getElementById("consultingDoctor").value;

        // Actualizar la fila seleccionada (puedes guardar una referencia a la fila en `editPatient`)
        const row = document.querySelector(".table__body tr.selected");
        const cells = row.querySelectorAll("td");

        cells[1].textContent = checkInDate;
        cells[2].textContent = `${firstName} ${lastName}`;
        cells[3].textContent = email;
        cells[4].textContent = phone;
        cells[5].textContent = doctor;

        // Cerrar el modal
        closeModal();
    }


