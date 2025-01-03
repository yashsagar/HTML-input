import User from "../modules/user.module.js";
import { validate } from "../utils/validation.js";
import bcrypt from "bcryptjs";
import { CustomError } from "../utils/CustomError.js";

export const signup = async (req, res) => {
  try {
    const { isValid, ...validatedData } = await validate({
      schema: "signup",
      data: req.body,
    });

    if (!isValid) {
      throw new CustomError({ message: "invalid data", data: validatedData });
    }
    const isUserExist = await User.findOne({ email: validatedData.email });

    if (isUserExist) {
      throw new CustomError({ message: "user email exist" });
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    validatedData.password = hashedPassword;

    const user = await User.create(validatedData);

    // add data to sesstion
    req.session.email = user.email;

    res.json({ success: true, message: "user created", data: user.toObject() });
  } catch (error) {
    if (error.name !== "customError") {
      res.customErrorRes({ status: 500, message: error.message });
    }
    res.customErrorRes(error);
  }
};

export const login = async (req, res) => {
  try {
    const { isValid, ...validatedData } = await validate({
      schema: "login",
      data: req.body,
    });
    if (!isValid) {
      throw new CustomError({
        message: "data validation error",
        data: validatedData,
      });
    }
    const user = await User.findOne({ email: validatedData.email });

    if (!user) {
      throw new CustomError({ message: "invalid credentioals" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new CustomError({
        message: "invalid credentials",
      });
    }

    //add user to a session
    req.session.email = user.email;

    res.json({
      success: true,
      message: "Login successful",
      data: user.toObject(),
    });
  } catch (error) {
    if (error.name !== "customError") {
      res.customErrorRes({ status: 500, message: error.message });
    }
    res.customErrorRes(error);
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.json({
      success: true,
      message: "logout successfull",
      data: { email: null },
    });
  } catch (error) {
    if (error.name !== "customError") {
      res.customErrorRes({ status: 500, message: error.message });
    }
    res.customErrorRes(error);
  }
};

export const authcheck = async (req, res) => {
  try {
    if (!req.session.email) {
      throw new CustomError({ message: "invalid token", data: { user: null } });
    }
    res.json({
      success: true,
      message: "auth check successfully",
      data: { email: req.session.email },
    });
  } catch (error) {
    if (error.name !== "customError") {
      res.customErrorRes({ status: 500, message: "somthing went wrong" });
    }
    res.customErrorRes(error);
  }
};
