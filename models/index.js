const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
// Override timezone formatting by requiring the Sequelize and doing it here instead
// Format datetime input
Sequelize.Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
  
    // Z here means current timezone, _not_ UTC
    // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    return date.format('YYYY-MM-DD HH:mm:ss');
};
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    options: dbConfig.options
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//force: true will drop the table if it already exists
db.sequelize.sync({
  force: false
}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  //initial();
});
db.user              = require("../models/user.model.js")(sequelize, Sequelize);
db.the_loai          = require("../models/the_loai.model.js")(sequelize, Sequelize);
db.truyen            = require("../models/truyen.model.js")(sequelize, Sequelize);
db.chuong            = require("../models/chuong.model.js")(sequelize, Sequelize);
db.binh_luan         = require("../models/binh_luan.model.js")(sequelize, Sequelize);
db.truyen_the_loai   = require("../models/truyen_the_loai.model.js")(sequelize, Sequelize);

// Associations  1- n
db.truyen.hasMany(db.truyen_the_loai, {
  foreignKey: 'id_truyen'
});
db.truyen_the_loai.belongsTo(db.truyen);

db.the_loai.hasMany(db.truyen_the_loai, {
  foreignKey: 'id_the_loai'
});
db.truyen_the_loai.belongsTo(db.the_loai);

db.truyen.hasMany(db.binh_luan, {
  foreignKey: 'id_truyen_binh_luan'
});
db.binh_luan.belongsTo(db.truyen);

db.user.hasMany(db.binh_luan, {
  foreignKey: 'id_user_binh_luan'
});
db.binh_luan.belongsTo(db.user);

db.truyen.hasMany(db.chuong, {
  foreignKey: 'id_truyen_chuong'
});
db.chuong.belongsTo(db.truyen);



module.exports = db;