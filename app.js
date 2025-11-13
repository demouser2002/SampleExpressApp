const express = require('express');

const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 8080

// Database connection setup (replace with your actual credentials)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database.');
});

// Vulnerable endpoint: SQL Injection
app.get('/users', (req, res) => {
    const username = req.query.username; // User-controlled input

    // Insecure query construction: directly concatenating user input into the SQL query
    const query = `SELECT * FROM users WHERE username = '${username}'`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Error retrieving users.');
        }
        res.json(results);
    });
});
app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
