import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

// workflowRouter.get("/", (req, res) => {
//     sendReminders
// })

workflowRouter.post('/subscription/remiander', sendReminders)

export default workflowRouter;