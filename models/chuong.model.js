module.exports = (sequelize, Sequelize) => {
    const Chuong = sequelize.define("chuong", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
          },
        ten_chuong: {
            type: Sequelize.TEXT
        }, 

        noi_dung: {
            type: Sequelize.TEXT
        }, 
        luot_xem_chuong:{
            type:Sequelize.INTEGER  
        },
        id_truyen_chuong: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: false,
            references: {
                model: 'truyens', 
                key: 'id' 
            }
        },
    });

    Chuong.associate = (models) => {
        models.truyen.hasMany(models.chuong, {
            foreignKey: 'id_truyen_chuong'
        });
        models.chuong.belongsTo(models.truyen);
    };
    return Chuong;
};