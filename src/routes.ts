import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserReceivedComplimentsController} from "./controllers/ListUserReceivedComplimentsController";
import { ListUserSendedComplimentsController } from "./controllers/ListUserSendedComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";


const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listUserSendedComplimentsController = new ListUserSendedComplimentsController();
const listTagController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/users', createUserController.handle);
router.get('/users', ensureAuthenticated, listUsersController.handle);

router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
router.get('/tags', ensureAuthenticated, listTagController.handle);

router.post('/login', authenticateUserController.handle);
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);


router.get('/users/compliments/send', ensureAuthenticated, listUserSendedComplimentsController.handle);
router.get('/users/compliments/receive', ensureAuthenticated, listUserReceivedComplimentsController.handle);


export { router };