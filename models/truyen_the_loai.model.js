module.exports = (sequelize, Sequelize) => {
    const Truyen_the_loai = sequelize.define("truyen_the_loai", {
        id_truyen: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'truyens',
                key: 'id'
            }
        },
        id_the_loai: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'the_loais',
                key: 'id'
            }
        },
    });

    Truyen_the_loai.associate = (models) => {
        models.truyen.hasMany(models.truyen_the_loai, {
            foreignKey: 'id_truyen'
        });
        Truyen_the_loai.belongsTo(models.truyen, {
            foreignKey: 'id_truyen'
        });

        models.the_loai.hasMany(models.truyen_the_loai, {
            foreignKey: 'id_the_loai'
        });
        Truyen_the_loai.belongsTo(models.the_loai, {
            foreignKey: 'id_the_loai'
        });
    };

     return Truyen_the_loai;
};
