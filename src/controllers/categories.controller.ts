import { Request, Response } from "express-serve-static-core";
import { datasource as ds } from "../database/data-source";
import { Category } from "../models/category.entity";
import { CreateCategory } from "../dtos/categories.dto";

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await ds.getRepository(Category).find();

    res
      .status(200)
      .json({ message: "all categories fetch success", data: categories });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId: string = req.params.id;

    const categories = await ds
      .getRepository(Category)
      .findOneBy({ category_id: categoryId });

    res
      .status(200)
      .json({ message: "queried category fetch success", data: categories });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const addCategory = async (req: Request, res: Response) => {
  try {
    const categoryRequestBody: CreateCategory = req.body;

    const accountRepository = ds.getRepository(Category);
    const category = accountRepository.create(categoryRequestBody);
    await accountRepository.save(category);

    res.status(201).json({ message: "category add success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const editCategory = async (req: Request, res: Response) => {
  try {
    const accountId: string = req.params.id;
    const accountUpdatedBody = req.body;
    await ds.getRepository(Category).update(accountId, accountUpdatedBody);

    res.status(200).json({ message: "category edit success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const accountId: string = req.params.id;
    await ds.getRepository(Category).delete(accountId);

    res.status(200).json({ message: "category delete success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

export {
  getCategories,
  getCategoryById,
  addCategory,
  editCategory,
  deleteCategory,
};
