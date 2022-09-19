import { DataTypes } from "sequelize";
import {sequelize} from "./db.js";

const PeliculaTest = sequelize.define("PeliculaTest", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    imagen: {
      type: DataTypes.STRING,
      defaultValue: "no hay imagen",
    },
    calificacion: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      },
      defaultValue: 3,
    },
 });

 export default PeliculaTest;