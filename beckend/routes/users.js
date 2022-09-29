const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt"); //criptografar senha

//CADASTRAR
router.post("/register", async (req, res) => {
  try {
    //gerar novo password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //criar usuario
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //salvar usuario e a resposta
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //buscar usuario
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong username or password");

    //validação de senha
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong username or password");

    //enviar a res
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;