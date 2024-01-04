module.exports = (sequelize, Sequelize) => {
    const The_loai = sequelize.define("the_loai", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
          },
        ten_the_loai: {
            type: Sequelize.STRING
        } 
    });
    return The_loai;
};