import { DataTypes } from "sequelize";
import {sequelize} from "./db.js";

const Personaje = sequelize.define("Personaje", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      defaultValue: "no hay imagen",
    },
    edad: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    peso: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    historia: {
      type: DataTypes.TEXT,
      defaultValue: "-",
    },
 }, { timestamps: false });

export default Personaje;