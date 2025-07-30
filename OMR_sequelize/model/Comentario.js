import { DataTypes } from "sequelize";
import { conn } from "../conn.js";
import Usuario from "./Usuario.js";
import Publicacao from "./Publicacao.js";

const Comentario = conn.define(
    "comentarios",
    {
        comentario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: "id",
            }
        },
        publicacao_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Publicacao,
                key: "id",
            }
        }
    },
    {
        tableName: "comentarios"
    }
)

//Associação com Usuários
Usuario.hasMany(Comentario, {foreignKey: "usuario_id"})
Comentario.belongsTo(Usuario, {foreignKey: "usuario_id"})

//Associação com Publicações
Publicacao.hasMany(Comentario, {foreignKey: "publicacao_id"})
Comentario.belongsTo(Publicacao, {foreignKey: "publicacao_id"})

export default Comentario;