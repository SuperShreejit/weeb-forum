import { Router } from 'express'
import { test, testEmailVerify, testResetPassword, testDeactivate, testError1, testError2, testError3 } from '../controllers/misc.controller'
import ROUTES from '../constants/routes';
const router = Router()

router.get(ROUTES.HELLO_WORLD, test)
router.get(ROUTES.TEST_EMAIL_VERIFY, testEmailVerify)
router.get(ROUTES.TEST_RESET_PASSWORD, testResetPassword)
router.get(ROUTES.TEST_DEACTIVATE, testDeactivate)
router.get(ROUTES.TEST_ERROR1, testError1)
router.get(ROUTES.TEST_ERROR2, testError2)
router.get(ROUTES.TEST_ERROR3, testError3)

export default router