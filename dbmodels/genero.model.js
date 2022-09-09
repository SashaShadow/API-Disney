import { DataTypes } from "sequelize";
import {sequelize} from "./db.js";

const Genero = sequelize.define("Genero", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      defaultValue: 'no hay imagen'
    },
 });

 export default Genero;