import mariadb from "mariadb";
import * as dotenv from 'dotenv'

dotenv.config();

// Configuration de la base de données
const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  port: process.env.DB_PORT || 3306,
  password: process.env.DB_PASSWORD || 'user',
  database: process.env.DB_DATABASE || 'database',
  connectionLimit: 5
});

async function initDB() {
  let conn;
  try {
    conn = await pool.getConnection();

    await conn.query(`
          CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);

    console.log('Structure de la base de données créée avec succès.');
    await conn.query(`
          INSERT INTO posts (title, content) VALUES
          ('Premier post', 'Contenu du premier post'),
          ('Deuxième post', 'Contenu du deuxième post'),
          ('Troisième post', 'Contenu du troisième post')
        `);

    console.log('Données insérées avec succès.');
  } catch (err) {
    console.error('Erreur lors de l\'initialisation de la base de données:', err);
  } finally {
    if (conn) {
      await conn.end();
    }
    process.exit();
  }
}

initDB();
