import Joi from "joi";
import bcrypt from "bcrypt";
import _ from "lodash";
import { SecretModel } from "../models/secretModel.js";

export const secretController = {
  /**
   * Retrieve secret from database
   */
  async getSecret(req, res) {
    const hash = req.params.hash;
    const secret = await SecretModel.findOne({ hash });

    if (!secret) {
      return "next";
    }

    const remainingViews = secret.expiresAfterViews
      ? secret.expiresAfterViews - secret.views
      : null;

    // validate expire time and views
    if (secret.expiresAt && secret.expiresAt < new Date()) {
      return res.status(410).send();
    }

    if (remainingViews !== null && remainingViews <= 0) {
      return res.status(410).send();
    }

    // increase views
    secret.views = secret.views + 1;
    secret.save();

    res.status(200).json({
      hash: secret.hash,
      secretText: secret.secretText,
      createdAt: secret.createdAt,
      expiresAt: secret.expiresAt,
      remainingViews: secret.expiresAfterViews ? secret.expiresAfterViews - secret.views : null
    });
  },

  /**
   * Create new secret in database
   */
  async createSecret(req, res) {
    const body = await Joi.object({
      secret: Joi.string(),
      expireAfterViews: Joi.number().integer().min(1).allow(null),
      expireAfter: Joi.date().timestamp().allow(null)
    }).validateAsync(req.body);

    try {
      const hash = await bcrypt.hash(body.secret, 7);

      const secret = await SecretModel.create({
        hash,
        secretText: body.secret,
        expiresAt: body.expireAfter,
        expiresAfterViews: body.expireAfterViews,
        views: 0
      });

      res.status(201).json({
        hash: secret.hash,
        secretText: secret.secretText,
        createdAt: secret.createdAt,
        expiresAt: secret.expiresAt,
        remainingViews: secret.expiresAfterViews ? secret.expiresAfterViews : null
      });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
