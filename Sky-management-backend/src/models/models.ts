import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Constellation extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public imageLink!: string;

    public readonly stars?: Star[];
}

Constellation.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'constellations',
    },
);

export class Star extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public imageLink!: string;
    public constellationId?: number;

    public readonly constellation?: Constellation;
}

Star.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        constellationId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: Constellation,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'stars',
    },
);

Constellation.sync().then((result) => console.log("The result: " + result));
Star.sync().then((result) => console.log("The result: " + result));

Constellation.hasMany(Star, { foreignKey: 'constellationId' });
Star.belongsTo(Constellation, { foreignKey: 'constellationId' });