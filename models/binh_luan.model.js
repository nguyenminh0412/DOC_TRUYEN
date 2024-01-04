module.exports = (sequelize, Sequelize) => {
    const Binh_luan = sequelize.define("binh_luan", {
      
        noi_dung_binh_luan: {
            type: Sequelize.TEXT
        }, 
        luot_thich_binh_luan: {
            type: Sequelize.INTEGER  
        },
        id_truyen_binh_luan: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: false,
            references: {
                model: 'truyens',
                key: 'id'
            }
        },
       
        id_user_binh_luan: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
    });

    Binh_luan.associate = (models) => {
        models.truyen.hasMany(models.binh_luan, {
            foreignKey: 'id_truyen_binh_luan'
        });
        Binh_luan.belongsTo(models.truyen, {
            foreignKey: 'id_truyen_binh_luan'
        });

        models.users.hasMany(models.binh_luan, {
            foreignKey: 'id_user_binh_luan'
        });
        Binh_luan.belongsTo(models.users, {
            foreignKey: 'id_user_binh_luan'
        });
    };

    return Binh_luan;
};