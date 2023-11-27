import express from 'express'
import { order } from '../controllers/order.controller';
import {currentUser, requireAuth} from "@s7adev/common"

const orderRouter = express.Router();

orderRouter.post('/book',currentUser, requireAuth, order)

export default orderRouter;