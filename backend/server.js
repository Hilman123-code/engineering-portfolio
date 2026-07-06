const path = require('path')
const multer = require('multer')
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err)
    return
  }

  console.log('Connected to MySQL database')
})

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

app.get('/', (req, res) => {
  res.send('Engineering Portfolio API is running')
})

app.get('/api/projects', (req, res) => {
  const sql = 'SELECT * FROM projects ORDER BY id DESC'

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch projects',
        error: err
      })
    }

    const projects = results.map((project) => ({
      ...project,
      tech: project.tech ? project.tech.split(',').map((item) => item.trim()) : []
    }))

    res.json(projects)
  })
})

const PORT = process.env.PORT || 5000

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    })
  }

  const sql = 'SELECT * FROM admins WHERE email = ?'

  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Login failed',
        error: err
      })
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const admin = results[0]

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    )

    res.json({
      message: 'Login successful',
      token
    })
  })
})

app.post('/api/admin/projects', (req, res) => {
  const {
    title,
    description,
    tech,
    image,
    github,
    demo,
    status,
    duration,
    role,
    overview,
    problem,
    solution,
    architecture,
    challenges,
    result,
    lessons
  } = req.body

  if (!title || !description || !tech) {
    return res.status(400).json({
      message: 'All fields are required'
    })
  }

  const sql = `
    INSERT INTO projects 
    (
      title, description, tech, image, github, demo, status, duration, role,
      overview, problem, solution, architecture, challenges, result, lessons
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  db.query(
    sql,
    [
      title,
      description,
      tech,
      image || '',
      github || '',
      demo || '',
      status || '',
      duration || '',
      role || '',
      overview || '',
      problem || '',
      solution || '',
      architecture || '',
      challenges || '',
      result || '',
      lessons || ''
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: 'Failed to add project',
          error: err
        })
      }

      res.json({
        message: 'Project added successfully'
      })
    }
  )
})

app.get('/api/admin/contacts', (req, res) => {
  const sql = 'SELECT * FROM contacts ORDER BY id DESC'

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch contacts',
        error: err
      })
    }

    res.json(results)
  })
})

app.delete('/api/admin/projects/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM projects WHERE id = ?'

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to delete project',
        error: err
      })
    }

    res.json({
      message: 'Project deleted successfully'
    })
  })
})

app.put('/api/admin/projects/:id', (req, res) => {
  const { id } = req.params

  const {
    title,
    description,
    tech,
    image,
    github,
    demo,
    status,
    duration,
    role,
    overview,
    problem,
    solution,
    architecture,
    challenges,
    result,
    lessons
  } = req.body

  if (!title || !description || !tech) {
    return res.status(400).json({
      message: 'All fields are required'
    })
  }

  const sql = `
    UPDATE projects
    SET 
      title = ?,
      description = ?,
      tech = ?,
      image = ?,
      github = ?,
      demo = ?,
      status = ?,
      duration = ?,
      role = ?,
      overview = ?,
      problem = ?,
      solution = ?,
      architecture = ?,
      challenges = ?,
      result = ?,
      lessons = ?
    WHERE id = ?
  `

  db.query(
    sql,
    [
      title,
      description,
      tech,
      image || '',
      github || '',
      demo || '',
      status || '',
      duration || '',
      role || '',
      overview || '',
      problem || '',
      solution || '',
      architecture || '',
      challenges || '',
      result || '',
      lessons || '',
      id
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: 'Failed to update project',
          error: err
        })
      }

      res.json({
        message: 'Project updated successfully'
      })
    }
  )
})

app.delete('/api/admin/contacts/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM contacts WHERE id = ?'

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to delete contact',
        error: err
      })
    }

    res.json({
      message: 'Contact deleted successfully'
    })
  })
})

app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params

  const sql = 'SELECT * FROM projects WHERE id = ?'

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch project',
        error: err
      })
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Project not found'
      })
    }

    const project = {
      ...results[0],
      tech: results[0].tech
        ? results[0].tech.split(',').map((item) => item.trim())
        : []
    }

    res.json(project)
  })
})

app.get('/api/profile', (req, res) => {
  const sql = 'SELECT * FROM profile LIMIT 1'

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch profile',
        error: err
      })
    }

    res.json(results[0])
  })
})

app.put('/api/admin/profile', (req, res) => {
  const {
    full_name,
    job_title,
    bio,
    profile_image,
    linkedin,
    github,
    email,
    phone,
    location,
    resume_url
  } = req.body

  const sql = `
    UPDATE profile
    SET 
      full_name = ?,
      job_title = ?,
      bio = ?,
      profile_image = ?,
      linkedin = ?,
      github = ?,
      email = ?,
      phone = ?,
      location = ?,
      resume_url = ?
    WHERE id = 1
  `

  db.query(
    sql,
    [
      full_name,
      job_title,
      bio,
      profile_image,
      linkedin,
      github,
      email,
      phone,
      location,
      resume_url
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: 'Failed to update profile',
          error: err
        })
      }

      res.json({
        message: 'Profile updated successfully'
      })
    }
  )
})

app.get('/api/admin/stats', (req, res) => {
  const sql = `
  SELECT
    (SELECT COUNT(*) FROM projects) AS total_projects,
    (SELECT COUNT(*) FROM contacts) AS total_contacts,
    (SELECT COUNT(*) FROM experiences) AS total_experiences,
    (SELECT COUNT(*) FROM certificates) AS total_certificates,
    (SELECT COUNT(*) FROM skills) AS total_skills
  `

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch stats',
        error: err
      })
    }

    res.json(results[0])
  })
})

app.get('/api/experiences', (req, res) => {
  const sql = 'SELECT * FROM experiences ORDER BY id DESC'

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch experiences',
        error: err
      })
    }

    res.json(results)
  })
})

app.post('/api/admin/experiences', (req, res) => {
  const { title, company, year, description } = req.body

  if (!title || !description) {
    return res.status(400).json({
      message: 'Title and description are required'
    })
  }

  const sql = `
    INSERT INTO experiences (title, company, year, description)
    VALUES (?, ?, ?, ?)
  `

  db.query(sql, [title, company, year, description], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to add experience',
        error: err
      })
    }

    res.json({
      message: 'Experience added successfully'
    })
  })
})

app.put('/api/admin/experiences/:id', (req, res) => {
  const { id } = req.params
  const { title, company, year, description } = req.body

  const sql = `
    UPDATE experiences
    SET title = ?, company = ?, year = ?, description = ?
    WHERE id = ?
  `

  db.query(sql, [title, company, year, description, id], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to update experience',
        error: err
      })
    }

    res.json({
      message: 'Experience updated successfully'
    })
  })
})

app.delete('/api/admin/experiences/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM experiences WHERE id = ?'

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to delete experience',
        error: err
      })
    }

    res.json({
      message: 'Experience deleted successfully'
    })
  })
})

app.get('/api/certificates', (req, res) => {
  const sql = 'SELECT * FROM certificates ORDER BY id DESC'

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch certificates',
        error: err
      })
    }

    res.json(results)
  })
})

app.post('/api/admin/certificates', (req, res) => {
  const { title, issuer, year, description, image } = req.body

  if (!title || !description) {
    return res.status(400).json({
      message: 'Title and description are required'
    })
  }

  const sql = `
    INSERT INTO certificates (title, issuer, year, description, image)
    VALUES (?, ?, ?, ?, ?)
  `

  db.query(sql, [title, issuer, year, description, image || ''], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to add certificate',
        error: err
      })
    }

    res.json({
      message: 'Certificate added successfully'
    })
  })
})

app.put('/api/admin/certificates/:id', (req, res) => {
  const { id } = req.params
  const { title, issuer, year, description, image } = req.body

  const sql = `
    UPDATE certificates
    SET title = ?, issuer = ?, year = ?, description = ?, image = ?
    WHERE id = ?
  `

  db.query(sql, [title, issuer, year, description, image || '', id], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to update certificate',
        error: err
      })
    }

    res.json({
      message: 'Certificate updated successfully'
    })
  })
})

app.delete('/api/admin/certificates/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM certificates WHERE id = ?'

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to delete certificate',
        error: err
      })
    }

    res.json({
      message: 'Certificate deleted successfully'
    })
  })
})

app.get('/api/skills', (req, res) => {
  const sql = 'SELECT * FROM skills ORDER BY id DESC'

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch skills',
        error: err
      })
    }

    res.json(results)
  })
})

app.post('/api/admin/skills', (req, res) => {
  const { icon, title, description } = req.body

  if (!title || !description) {
    return res.status(400).json({
      message: 'Title and description are required'
    })
  }

  const sql = 'INSERT INTO skills (icon, title, description) VALUES (?, ?, ?)'

  db.query(sql, [icon, title, description], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to add skill',
        error: err
      })
    }

    res.json({
      message: 'Skill added successfully'
    })
  })
})

app.put('/api/admin/skills/:id', (req, res) => {
  const { id } = req.params
  const { icon, title, description } = req.body

  const sql = `
    UPDATE skills
    SET icon = ?, title = ?, description = ?
    WHERE id = ?
  `

  db.query(sql, [icon, title, description, id], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to update skill',
        error: err
      })
    }

    res.json({
      message: 'Skill updated successfully'
    })
  })
})

app.delete('/api/admin/skills/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM skills WHERE id = ?'

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to delete skill',
        error: err
      })
    }

    res.json({
      message: 'Skill deleted successfully'
    })
  })
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })

app.post('/api/admin/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'No file uploaded'
    })
  }

  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`

  res.json({
    message: 'Image uploaded successfully',
    imageUrl
  })
})

app.get('/api/projects/:id/images', (req, res) => {
  const { id } = req.params

  const sql = 'SELECT * FROM project_images WHERE project_id = ? ORDER BY id DESC'

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch project images',
        error: err
      })
    }

    res.json(results)
  })
})

app.post('/api/admin/projects/:id/images', (req, res) => {
  const { id } = req.params
  const { image_url, caption } = req.body

  if (!image_url) {
    return res.status(400).json({
      message: 'Image URL is required'
    })
  }

  const sql = `
    INSERT INTO project_images (project_id, image_url, caption)
    VALUES (?, ?, ?)
  `

  db.query(sql, [id, image_url, caption || ''], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to add project image',
        error: err
      })
    }

    res.json({
      message: 'Project image added successfully'
    })
  })
})

app.delete('/api/admin/project-images/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM project_images WHERE id = ?'

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to delete project image',
        error: err
      })
    }

    res.json({
      message: 'Project image deleted successfully'
    })
  })
})

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({
      message: 'All fields are required'
    })
  }

  const sql = `
    INSERT INTO contacts (name, email, message)
    VALUES (?, ?, ?)
  `

  db.query(sql, [name, email, message], async (err) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to save contact message',
        error: err
      })
    }

    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `New Portfolio Message from ${name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      })

      res.json({
        message: 'Message saved and email sent successfully'
      })
    } catch (emailErr) {
      console.error('Email send failed:', emailErr)

      res.json({
        message: 'Message saved, but email notification failed'
      })
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})