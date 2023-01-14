var selectedRow = null;

const studentForm = document.querySelector('#student-form');
const studentList = document.querySelector('#student-list');


//Funktion för att lägga till en student
async function addStudent(e) {
  e.preventDefault();

  // // Hämta value från formuläret
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const lanId = document.querySelector('#lanId').value;

  //Validera formuläret

  if (firstName === '' || lastName === '' || lanId === '') {
    showAlert('Please fill in all fields', 'danger');
  } else {
    // Skapa student-objektet
    const student = {
      firstName,
      lastName,
      lanId
    };

    if (selectedRow === null) {
      console.log("Demo")

  // Lägg till student
  await postStudent(student);
      showAlert('Student added', 'success');
    } else {

  // Uppdatera student
  student.id = selectedRow.querySelector('.edit').getAttribute('data-id');
      await updateStudent(student);
      showAlert('Student updated', 'info');
      selectedRow = null;
    }

    // Rensa formuläret
    studentForm.reset();

// Rensa och rendera studenter
getAndRenderStudents();
  }
}

//Funktion för att ta bort en student
async function removeStudent(e) {
  if (e.target.classList.contains('delete')) {
    const studentId = e.target.getAttribute('data-id');
    await deleteStudent(studentId);
    showAlert('Student deleted', 'danger');
      getAndRenderStudents();
  }
}

//Funktion för att redigera en student
async function editStudent(e) {
  if (e.target.classList.contains('edit')) {
    const studentId = e.target.getAttribute('data-id');
    const student = await getStudentId(studentId);
    document.querySelector('#firstName').value = student.firstName;
    document.querySelector('#lastName').value = student.lastName;
    document.querySelector('#lanId').value = student.lanId;
    selectedRow = e.target.parentElement.parentElement;
  }
}

async function getAndRenderStudents() {
  // Get students from API
  const students = await getStudents();

  // Clear student list
  studentList.innerHTML = '';

  // Render students
  students.forEach((student) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.lanId}</td>
      <td>
        <a href="#" class="btn btn-outline-warning btn-sm edit" data-id="${student.id}">Edit</a>
        <a href="#" class="btn btn-outline-danger btn-sm delete" data-id="${student.id}">Delete</a>
        </td>
        `;
        studentList.appendChild(row);
        });
        }
        
        // Add event listeners
        studentForm.addEventListener('submit', addStudent);
        studentList.addEventListener('click', removeStudent);
        studentList.addEventListener('click', editStudent);
        
        // Render students when page loads
        getAndRenderStudents();
        
 
