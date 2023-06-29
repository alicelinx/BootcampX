const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

console.log('connected');
const cohortName = process.argv[2];

const value = [cohortName];

const queryString = `
  SELECT DISTINCT cohorts.name, teachers.name as teacher
  FROM assistance_requests
  JOIN teachers ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name = $1
  ORDER BY teachers.name
`;

pool.query(queryString, value)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${cohortName}: ${row.teacher}`);
    });
  });