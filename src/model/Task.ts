import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    estado: {
      type: Boolean,
      default: false,
    },
    fechaEntrega: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    prioridad: {
      type: String,
      required: true,
      enum: ["Baja", "Media", "Alta"],
    },
    proyecto: {
      type: Schema.Types.ObjectId,
      ref: "Proyect",
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model("Task", TaskSchema, "tasks");
