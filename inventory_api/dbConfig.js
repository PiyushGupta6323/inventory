var dbConfig = {
  connectionTimeout : 30000,
  database: "RSWAN_NEW",
  server: "VIVEK\\SQLEXPRESSNEW",
  options: {
      trustedConnection: true,
  }
};


const dbConfig1 = {
    connectionTimeout: 30000,
    database: "Rswan_int_test",
    server: "VIVEK\\SQLEXPRESSNEW",
    options: {
        trustedConnection: true,
    },
};

const dbConfig2 = {
    connectionTimeout: 30000,
    database: "Rswan_int",
    server: "VIVEK\\SQLEXPRESSNEW",
    options: {
        trustedConnection: true,
    },
};

module.exports = { dbConfig, dbConfig1, dbConfig2};