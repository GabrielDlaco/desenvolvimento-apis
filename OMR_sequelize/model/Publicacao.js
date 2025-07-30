import { DataTypes } from "sequelize";
import { conn } from "../conn.js";
import Usuario from "./Usuario.js";

const Publicacao = conn.define(
    "publicacoes",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: "id"
            }
        }
    },
    {
        tableName: "publicacoes"
    }
)

Usuario.hasMany(Publicacao, {foreignKey: "usuario_id"})
Publicacao.belongsTo(Usuario, {foreignKey: "usuario_id"})

export default Publicacao;