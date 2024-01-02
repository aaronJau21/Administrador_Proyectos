import { Proyect } from "../model/Proyect";

export const sharedIdProject = async (id: string) => {
  const proyect = await Proyect.findById(id);

  return proyect;
};
