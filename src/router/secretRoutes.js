import { secretController } from "../controllers/secretController.js";

export function secretRoutes(router) {
  router.get("/secret/:hash", secretController.getSecret);
  router.post("/secret", secretController.createSecret);
}
