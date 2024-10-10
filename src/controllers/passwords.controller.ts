import { Request, Response } from "express-serve-static-core";
import CryptoJS from "crypto-js";
const { AES } = CryptoJS;
import { datasource as ds } from "../database/data-source";
import { Password } from "../models/password.entity";
import { CreatePassword } from "../dtos/passwords.dto";

const getPasswords = async (req: Request, res: Response) => {
  try {
    const passwords = await ds
      .getRepository(Password)
      .createQueryBuilder("p")
      .select([
        "p.password_id",
        "p.account_name",
        "p.account_url",
        "p.hashed_password",
        "p.description",
        "p.expiry_date",
        "p.created_at",
        "p.updated_at",
      ])
      .orderBy("p.account_name")
      .getMany();

    res
      .status(200)
      .json({ message: "all passwords fetch success", data: passwords });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const getPasswordById = async (req: Request, res: Response) => {
  try {
    const passwordId: string = req.params.id;
    const password = await ds
      .getRepository(Password)
      .createQueryBuilder("p")
      .select([
        "p.password_id",
        "p.account_name",
        "p.account_url",
        "p.hashed_password",
        "p.description",
        "p.expiry_date",
        "p.created_at",
        "p.updated_at",
      ])
      .where("p.password_id = :passwordId", { passwordId })
      .getOne();

    res
      .status(200)
      .json({ message: "password details fetch success", data: password });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const addPassword = async (req: Request, res: Response) => {
  try {
    const passwordRequestBody: CreatePassword = req.body;

    const originalPassword: string = passwordRequestBody.original_password;
    const hashedPassword: string = AES.encrypt(
      originalPassword,
      passwordRequestBody.account_name.trim()
    ).toString();
    passwordRequestBody.hashed_password = hashedPassword;

    const passwordRepository = ds.getRepository(Password);
    const password = passwordRepository.create(passwordRequestBody);
    await passwordRepository.save(password);

    res.status(201).json({
      message: "password add success",
    });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const editPassword = async (req: Request, res: Response) => {
  try {
    const passwordId: string = req.params.id;
    const passwordUpdatedBody: CreatePassword = req.body;

    const originalPassword: string = passwordUpdatedBody.original_password;
    const hashedPassword: string = AES.encrypt(
      originalPassword,
      passwordUpdatedBody.account_name.trim()
    ).toString();
    passwordUpdatedBody.hashed_password = hashedPassword;

    await ds.getRepository(Password).update(passwordId, passwordUpdatedBody);

    res.status(200).json({
      message: "password edit success",
    });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const deletePassword = async (req: Request, res: Response) => {
  try {
    const passwordId: string = req.params.id;
    await ds.getRepository(Password).delete(passwordId);

    res.status(200).json({ message: "password delete success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

export {
  getPasswords,
  addPassword,
  editPassword,
  deletePassword,
  getPasswordById,
};
