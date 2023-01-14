// Import av Express och fs modulen med promises
const express = require('express');
const app = express();
const fs = require('fs/promises');

//Definiera port och sökväg till json-fil
const PORT = 5500;
const JSON_FILE_PATH = "task.json"


//Använd express middleware för att hantera JSON och formulärdata
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {

    //Använd middleware för att sätta header för CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next();
  });


//GET-route för att hämta alla studenter

app.get('/students', async (req, res) => {
  try {
    const students = await fs.readFile(JSON_FILE_PATH);
    res.send(JSON.parse(students));
  } catch (error) {
    res.status(500).send({ error });
  }
});
//GET-route för att hämta en specifik student med id
app.get('/students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const students = await fs.readFile(JSON_FILE_PATH);
    let json = JSON.parse(students);
    res.send(json.find(students =>students.id == id));
  } catch (error) {
    res.status(500).send({ error });
  }
});
//POST-route för att lägga till en ny student
app.post('/students', async (req, res) => {
  try {
    const task = req.body;

    const listBuffer = await fs.readFile(JSON_FILE_PATH);
    const currentStudents = JSON.parse(listBuffer);
    let maxTaskId = 1;
    if (currentStudents && currentStudents.length > 0) {
      maxTaskId = currentStudents.reduce(
        (maxId, currentElement) => (currentElement.id > maxId ? currentElement.id : maxId),
        maxTaskId
      );
    }
    const newTask = { id: maxTaskId + 1, ...task };
    const newList = currentStudents ? [...currentStudents, newTask] : [newTask];

    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(newList));
    res.send(newTask);
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

//DELETE-route för att ta bort en student med id

app.delete('/students/:id', async (req, res) => {
  console.log(req);
  try {
    const id = req.params.id;
    const listBuffer = await fs.readFile(JSON_FILE_PATH);
    const currentStudents = JSON.parse(listBuffer);
    if (currentStudents.length > 0) {
      await fs.writeFile(JSON_FILE_PATH, JSON.stringify(currentStudents.filter((task) => task.id != id)));
      res.send({ message: `Uppgift med id ${id} togs bort` });
    } else {
      res.status(404).send({ error: 'Ingen uppgift att ta bort' });
    }
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

//PUT-route för att uppdatera en student med id

app.put('/students/:id', async (req, res) => {
  let students = await fs.readFile(JSON_FILE_PATH)
  let currentStudents = JSON.parse(students)
  try {
    const id = req.params.id;
    const updatedStudent = req.body;
    
    // Find the student by id and update it
    const studentIndex = currentStudents.findIndex((student) => student.id == id);
    if (studentIndex === -1) {
        res.status(404).send({ error: 'student not found' });
        return;
    }
    currentStudents[studentIndex] = {...currentStudents[studentIndex], ...updatedStudent};
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(currentStudents));
    res.send({ message: `Student with id ${id} updated` });
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
