const express = require('express');
const data = require('./data.json');
const app = express();
const port = 3000;

app.use(express.json());

// Use existing data from data.json
const students = data;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/students/above-threshold', (req, res) => {
    const threshold = req.body.threshold;

    if (typeof threshold !== 'number' || threshold < 0) {
        return res.status(400).json({ error: 'Invalid threshold value' });
    }

    const filteredStudents = students.filter(student => student.total > threshold);
    const response = {
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({
            name: student.name,
            total: student.total
        }))
    };

    res.json(response);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});