import sqlize from "sequelize";
import {sequelize}  from '../instances/db.js';

const {DataTypes} = sqlize;

export const User = sequelize.define("User", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});