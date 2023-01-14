// apiUrl - en variabel som innehåller adressen till vår API
const apiUrl = 'http://localhost:5500';

// Funktion för att hämta alla studenter från API:et
async function getStudents() {

  // Skickar en GET-förfrågan till apiUrl/students
  const response = await fetch(`${apiUrl}/students`);
  if (!response.ok) {
    throw new Error('Failed to get students');
  }
  return response.json();
}

// Funktion för att hämta en enskild student med ett visst id från API:et
async function getStudentId(id) {
  const response = await fetch(`${apiUrl}/students/${id}`);
  if (!response.ok) {
    throw new Error('Failed to get students');
  }
  return response.json();
}

// Funktion för att lägga till en ny student till API:et
async function postStudent(student) {
  const response = await fetch(`${apiUrl}/students`, {
    method: 'POST',
    body: JSON.stringify(student),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to add student');
  }
  return response.json();
}

//Funktionen för att uppdatera en student
async function updateStudent(student) {
  const response = await fetch(`${apiUrl}/students/${student.id}`, {
    method: 'PUT',
    body: JSON.stringify(student),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to update student');
  }
  return response.json();
}


//Funktionen för att ta bort en student
async function deleteStudent(studentId) {
  const response = await fetch(`${apiUrl}/students/${studentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to delete student');
  }
  return response.json();
}

