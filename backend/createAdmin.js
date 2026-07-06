const mysql = require('mysql2')
const bcrypt = require('bcrypt')
require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

const createAdmin = async () => {
  const email = 'admin@gmail.com'
  const plainPassword = 'admin123'

  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  const sql = 'INSERT INTO admins (email, password) VALUES (?, ?)'

  db.query(sql, [email, hashedPassword], (err) => {
    if (err) {
      console.error('Failed to create admin:', err)
      return
    }

    console.log('Admin created successfully')
    console.log('Email:', email)
    console.log('Password:', plainPassword)

    db.end()
  })
}

createAdmin()