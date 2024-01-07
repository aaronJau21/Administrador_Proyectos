import { Response } from "express";
import { ResUser } from "../middleware/checkAuth";
import { Proyect } from "../model/Proyect";
import { Task } from "../model/Task";

export const addTask = async (req: ResUser, res: Response) => {
  const { proyecto } = req.body;

  const existsProject = await Proyect.findById(proyecto);
  if (!existsProject) {
    return res.status(404).send({
      msg: "Not Fount Project",
    });
  }

  if (existsProject.creador?.toString() !== req.user._id.toString()) {
    return res.status(404).send({
      msg: "You dom't have the appropriate permissions to add tasks",
    });
  }

  try {

    

    const storeTask = await Task.create(req.body);
    return res.send({
      msg: "Created Task",
      task: storeTask,
    });
  } catch (error: any) {
    return res.status(500).send({
      msg: error.message,
    });
  }
};

export const getTask = async (req: ResUser, res: Response) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  const project = task;

  const existProject = await Proyect.findById(project?.proyecto);

  if (!task) {
    return res.status(404).send({
      msg: "Task not found ",
    });
  }

  if (existProject?.creador?.toString() !== req.user._id.toString()) {
    return res.status(403).send({
      msg: "you do not have permissions to add tasks ",
    });
  }

  return res.send({
    msg: "Get Task",
    task: task,
  });
};

export const updateTask = async (req: ResUser, res: Response) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  const project = task;

  const existProject = await Proyect.findById(project?.proyecto);

  if (!task) {
    return res.status(404).send({
      msg: "Task not found ",
    });
  }

  if (existProject?.creador?.toString() !== req.user._id.toString()) {
    return res.status(403).send({
      msg: "you do not have permissions to add tasks ",
    });
  }

  task.nombre = req.body.nombre || task.nombre;
  task.descripcion = req.body.descripcion || task.descripcion;
  task.prioridad = req.body.prioridad || task.prioridad;
  task.fechaEntrega = req.body.fechaEntrega || task.fechaEntrega;

  try {
    const storageTask = await task.save();

    return res.send({
      msg: "Updated Task",
      task: storageTask,
    });
  } catch (error: any) {
    return res.status(500).send({
      msg: error.message,
    });
  }
};

export const deleteTask = async (req: ResUser, res: Response) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  const proyecto = task;

  if (!task) {
    return res.status(404).send({
      msg: "Task not found",
    });
  }

  const existProject = await Proyect.findById(proyecto?.proyecto);

  if (existProject?.creador?.toString() !== req.user._id.toString()) {
    return res.status(403).send({
      msg: "you do not have permissions to add tasks ",
    });
  }

  try {
    await task.deleteOne();

    return res.send({
      msg: "Deleted Task",
    });
  } catch (error: any) {
    return res.status(500).send({
      msg: error.message,
    });
  }
};

export const changeState = async () => {};
