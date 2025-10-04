import * as UserService from '../services/userService.js';

export const register = async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json({ message: 'Usuario registrado', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const registerCompany = async (req, res) => {
  try {
    const user = await UserService.registerCompany(req.body);
    res.status(201).json({ message: 'Empresa registrada', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.json({ user: req.user });
};
