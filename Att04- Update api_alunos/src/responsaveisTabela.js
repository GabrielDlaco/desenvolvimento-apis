import { DataTypes } from "sequelize"
import conn from "./sequelize.js"

const responsavelTabela = conn.define(
    "responsaveis",
    {
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        idade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },

        senha: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },

        telefone: {
            type: DataTypes.INTEGER(13),
            allowNull: false
        },

        grau_parentesco: {
            type: DataTypes.ENUM('pai', 'mae', 'avo', 'tio', 'tia'),
            allowNull: false
        },

        endereco: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        data_nascimento: {
            type: DataTypes.DATE,
            allowNull: false
        }

    },

    {
        tableName: "responsaveis"
    }

);

export default responsavelTabela;
