import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, getUserSubscription } from "../controllers/subscription.controller.js";
const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: 'GET all subscriptions' }));

subscriptionRouter.get("/:id", (req, res) => res.send({ title: 'GET subscriptions details' }));

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/", (req, res) => res.send({ title: 'Update subscriptions' }));

subscriptionRouter.delete("/", (req, res) => res.send({ title: 'Delete subscriptions' }));

subscriptionRouter.get("/user/:id", authorize, getUserSubscription);

subscriptionRouter.get("/:id/cancel", (req, res) => res.send({ title: 'Cancel subscriptions' }));

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({ title: 'GET upcoming renewals' }));



export default subscriptionRouter;