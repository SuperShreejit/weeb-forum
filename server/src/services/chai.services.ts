import chaiHttp from 'chai-http'
import chai from 'chai'
import app from '../index'

chai.use(chaiHttp)

export const chaiGet = async (url: string) => await chai.request(app).get(url)

export const chaiPost = async (url: string, body: object) =>
	await chai.request(app).post(url).send(body)

export const chaiPatch = async (url: string, body: object) =>
	await chai.request(app).patch(url).send(body)

type AttachOptionsType = {
	filename?: string | undefined
	contentType?: string | undefined
}
export const chaiPatchWithAvatar = async (
	url: string,
	avatar: Buffer,
	options?: AttachOptionsType
) =>
	await chai
		.request(app)
		.patch(url)
		.set('content-type', 'multipart/form-data')
		.attach('avatar', avatar, options)

export const chaiDelete = async (url: string) =>
	await chai.request(app).delete(url)

export const chaiDeleteWithBody = async (url: string, body: object) =>
	await chai.request(app).delete(url).send(body)

export const chaiGetWithAuth = async (url: string, cookie: string) =>
	await chai.request(app).get(url).set('Cookie', cookie)

export const chaiPostWithAuth = async (
	url: string,
	body: object,
	cookie: string
) => await chai.request(app).post(url).set('Cookie', cookie).send(body)

export const chaiPatchWithAuth = async (
	url: string,
	body: object,
	cookie: string
) => await chai.request(app).patch(url).set('Cookie', cookie).send(body)

export const chaiPatchWithAvatarAndAuth = async (
	url: string,
	cookie: string,
	avatar: Buffer,
	options?: AttachOptionsType
) =>
	await chai
		.request(app)
		.patch(url)
		.set('Cookie', cookie)
		.set('content-type', 'multipart/form-data')
		.attach('avatar', avatar, options)

export const chaiDeleteWithAuth = async (url: string, cookie: string) =>
	await chai.request(app).delete(url).set('Cookie', cookie)

export const chaiDeleteWithBodyAndAuth = async (
	url: string,
	body: object,
	cookie: string
) => await chai.request(app).delete(url).set('Cookie', cookie).send(body)

export const assert = chai.assert

export type ResponseType = Awaited<
	ReturnType<
		| typeof chaiGet
		| typeof chaiGetWithAuth
		| typeof chaiPost
		| typeof chaiPostWithAuth
		| typeof chaiPatch
		| typeof chaiPatchWithAvatar
		| typeof chaiPatchWithAuth
		| typeof chaiPatchWithAvatarAndAuth
		| typeof chaiDelete
		| typeof chaiDeleteWithAuth
		| typeof chaiDeleteWithBody
		| typeof chaiDeleteWithBodyAndAuth
	>
>
