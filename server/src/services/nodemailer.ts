import nodemailer from 'nodemailer'
import getError from '../helpers/getError'
import path from 'path'
import { htmlToText } from 'html-to-text'
import juice from 'juice'
import ejs from 'ejs'
import { TEMPLATES, TEMPLATE_FILES } from '../constants/templates';
import ROUTES from '../constants/routes';
import { CustomError } from '../helpers/CustomError'
import { StatusCodes } from 'http-status-codes'

const transporter = nodemailer.createTransport({
	service: 'SendinBlue',
	secure: false,
	auth: {
		user: process.env.SENDINBLUE_USER,
    pass: process.env.SENDINBLUE_PASSWORD,
	},
})

export const sendMail = (receiver: string, subject: string, text: string, html: string) => {
	try {
		const mailOptions = {
      from: 'Weeb Forum: Mailbot <' + process.env.EMAIL_NODEMAILER + '>',
      to: receiver,
      subject,
      html,
      text
    }
    
    transporter.sendMail(mailOptions)
	} catch (error) {
		throw new CustomError(getError(error), StatusCodes.INTERNAL_SERVER_ERROR)
	}
}

type templateVars = {
  name: string
  home: ROUTES
  OTP: string
}
 
export const generateMailbodies = async (templateFile: TEMPLATE_FILES, templateVars: templateVars) => {
  const filePath = path.join(__dirname, TEMPLATES.BASE, templateFile)
  const renderedHTML = await ejs.renderFile(filePath, templateVars)
  const text = htmlToText(renderedHTML)
  const html = juice(renderedHTML)
  return { text, html }
}