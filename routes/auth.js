"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const users = require('../init_data.json').data;
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const { BadRequestError } = require("../expressError");


// returns JWT to authenticate future requests

router.post("/token", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { iid, password } = req.body;
    if (users[id]) {
      const isValid = await bcrypt.compare(password, users[id].hashed_password);
      if (isValid) {
        const token = createToken(users[id]);
        return res.json({ token });}
    }
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
