const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId, authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema, "POST"), ctrl.addContact);

router.post("/", upload.single("cover"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
});

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema, "PUT"),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "PATCH"),
  ctrl.updateFavorite
);

module.exports = router;
