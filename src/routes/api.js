import {Router} from 'express';

import * as lojasApi from '../controllers/apiController.js';
import * as UserApi from '../controllers/userController.js';
import { Auth } from '../middlewares/auth.js';

const router = Router();

router.post('/user/newregister', UserApi.newRegister);
router.post('/user/login', UserApi.login);
router.post('/lojas/newregister', Auth.private, lojasApi.newRegister);
router.get('/lojas/estabelecimento', Auth.private, lojasApi.getEstabelecimento);
router.put('/lojas/estabelecimento', Auth.private, lojasApi.putEstabelecimento);
router.delete('/lojas/estabelecimento', Auth.private, lojasApi.deletarEstabelecimento);

// router.get('/estabelecimento/{local}', lojasApi.getEstabelecimento);
export default router