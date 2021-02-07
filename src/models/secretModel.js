import mongoose from "mongoose";

export const secretSchema = new mongoose.Schema(
  {
    hash: String,
    secretText: String,
    views: Number,
    createdAt: Date,
    expiresAt: Date,
    expiresAfterViews: 0,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const SecretModel = mongoose.model("SecretModel", secretSchema);
