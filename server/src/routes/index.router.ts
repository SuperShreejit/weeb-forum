import { Router } from 'express'
import postsRouter from './posts.router'
import usersRouter from './users.router'
import authRouter from './auth.router'
import testsRouter from './misc.router'
import { notFound } from '../controllers/misc.controller'
import ROUTES from '../constants/routes'
const router = Router()

router.use(ROUTES.TEST_BASE, testsRouter)
router.use(ROUTES.POSTS_BASE, postsRouter)
router.use(ROUTES.USERS_BASE, usersRouter)
router.use(ROUTES.AUTH_BASE, authRouter)

router.get(ROUTES.NOT_FOUND, notFound)

export default router
