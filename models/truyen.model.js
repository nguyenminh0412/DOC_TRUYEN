module.exports = (sequelize, Sequelize) => {
    const Truyen = sequelize.define("truyen", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
          },
        ten_truyen:  { type: Sequelize.TEXT } ,
        tac_gia:  { type: Sequelize.TEXT } ,
        tinh_trang:  { type: Sequelize.BOOLEAN } ,
        gioi_thieu:  { type: Sequelize.TEXT } ,
        luot_xem_truyen:  { type: Sequelize.INTEGER } ,
        luot_thich_truyen:  { type: Sequelize.INTEGER }  
    });
    return Truyen;
};