import type { Request, Response } from "express";

import AppError from "../error/AppError.js";
import { categorySchema } from "../schemas/categorySchemas.js";
import { categoryService } from "../services/categoryService.js";

export const categoryController = {
  createCategory: async (req: Request, res: Response) => {
    const body = categorySchema.parse(req.body);

    const category = await categoryService.create(body);
    res.status(201).json({
      category,
    });
  },
  updateCategory: async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = categorySchema.parse(req.body);

    const category = await categoryService.updateCategory(
      id as string,
      body.descrition,
    );
    res.status(201).json({
      category,
    });
  },
  listCategory: async (req: Request, res: Response) => {
    const list = await categoryService.listCategory();
    return res.status(201).json({
      list: list,
    });
  },
  deleteCategory: async (req: Request, res: Response) => {
    const {id} = req.params
    const del = await categoryService.deleteCategory(id as string);
    return res.status(201).json({
      menssage: `Categoria ${del.descrition} deletada`,
    });
  },
};
