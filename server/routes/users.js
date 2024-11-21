import express from "express";
import {
    getUser,
    getUserFriend,
    addremoveFriend,
} from "../controllers/users.js";
import { verifyToken } from  "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriend);

/* UPDATE */
router.patch("./:id/:friendId", verifyToken, addremoveFriend);

export default router;
