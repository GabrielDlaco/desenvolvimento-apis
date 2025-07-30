import { DataTypes } from "sequelize";
import { conn } from "../conn.js";
import Usuario from "./Usuario.js";

const Perfil = conn.define(
    "perfis",
    {
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //relacionamento
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: "id",
            }
        }
    },
    {
        tableName: "perfis"
    }
)

//Associação 1:1 -> Usuário tem um Perfil e Perfil pertence a Usuário
Usuario.hasOne(Perfil, {foreignKey: "usuario_id"})
Perfil.belongsTo(Usuario, {foreignKey: "usuario_id"})

export default Perfil;