import { DataTypes } from "sequelize";
import {sequelize} from "./db.js";

const Usuario = sequelize.define("Usuario", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
          }
    }
 });

 Usuario.sync();

 export default Usuario;