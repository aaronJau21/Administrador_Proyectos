import { Request, Response } from "express";
import { ResUser } from "../middleware/checkAuth";
import { Proyect } from "../model/Proyect";
import { sharedIdProject } from "../helpers/shared-project.helpers";

export const getProyects = async (req: ResUser, res: Response) => {
  const proyects = await Proyect.find().where("creador").equals(req.user);

  return res.send(proyects);
};

export const newProyect = async (req: ResUser, res: Response) => {
  const proyecto = new Proyect(req.body);
  proyecto.creador = req.user._id;
  try {
    const storedProyect = await proyecto.save();
    return res.send({
      msg: "Project Created",
      proyect: storedProyect,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

export const getProyect = async (req: ResUser, res: Response) => {
  const { id } = req.params;
  const proyect = await sharedIdProject(id);
  if (!proyect) {
    return res.status(404).send({
      message: "Not found Project",
    });
  }

  if (proyect.creador?.toString() !== req.user._id.toString()) {
    return res.status(401).send({
      msg: "Invalid actions",
    });
  }
  return res.send(proyect);
};

export const editProyect = async (req: ResUser, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion, fechaEntrega, cliente } = req.body;
  const proyect = await sharedIdProject(id);
  if (!proyect) {
    return res.status(404).send({
      message: "Not found Project",
    });
  }

  if (proyect.creador?.toString() !== req.user._id.toString()) {
    return res.status(401).send({
      msg: "Invalid actions",
    });
  }

  proyect.nombre = nombre || proyect.nombre;
  proyect.descripcion = descripcion || proyect.descripcion;
  proyect.fechaEntrega = fechaEntrega || proyect.fechaEntrega;
  proyect.cliente = cliente || proyect.cliente;

  try {
    const storedProject = await proyect.save();

    return res.send({
      msg: "Updated Project",
      project: storedProject,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

export const deleteProyect = async (req: ResUser, res: Response) => {
  const { id } = req.params;
  const proyect = await sharedIdProject(id);
  if (!proyect) {
    return res.status(404).send({
      message: "Not found Project",
    });
  }

  if (proyect.creador?.toString() !== req.user._id.toString()) {
    return res.status(401).send({
      msg: "Invalid actions",
    });
  }

  try {
    await proyect.deleteOne();
    return res.send({
      msg: "Deleted Project",
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

export const addColaborator = async (_req: Request, _res: Response) => {};

export const deleteColaborator = async (_req: Request, _res: Response) => {};

export const getTasks = async (_req: Request, _res: Response) => {};
