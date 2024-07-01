module.exports = {
    HOST: "localhost",
    USER: "kalori",
    PASSWORD: "*******",
    DB: "kalori",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
