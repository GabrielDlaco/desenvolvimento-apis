import { DataTypes } from "sequelize"
import conn from "./sequelize.js"
import responsavelTabela from "./responsaveisTabela.js";

const alunoTabela = conn.define("Aluno", 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ra: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [11, 20]
            }
        },
        nome:{
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        responsavel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: responsavelTabela,
                key: "id"
            }
        }
    },
    {
        tableName: 'alunos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

responsavelTabela.hasMany(alunoTabela, {foreignKey: "responsavel_id"})
alunoTabela.belongsTo(responsavelTabela, {foreignKey: "responsavel_id"})

export default alunoTabela;