import sqlize from "sequelize";
import {sequelize}  from '../instances/db.js';

const {DataTypes} = sqlize;

export const Lojas = sequelize.define("Loja", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    descricao: {
        type: DataTypes.STRING,
    },
    localizacao: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'estabelecimentos',
    timestamps: false
});