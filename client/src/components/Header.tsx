import '../sass/components/_headers.scss'
import { HEADERS, HEADER_VARIANT, HEADER_CLASSES } from '../constants/header'
import { ELEMENTS } from '../constants/component';

type HeaderProps = (
	| JSX.IntrinsicElements[ELEMENTS.H2]
	| JSX.IntrinsicElements[ELEMENTS.H3]
	| JSX.IntrinsicElements[ELEMENTS.H4]
) & { variant: HEADER_VARIANT; text: HEADERS }

const Header = ({ variant, text, ...rest }: HeaderProps) => {
	switch (variant) {
		case HEADER_VARIANT.PRIMARY_H2:
			return (
				<h2
					className={`${HEADER_CLASSES.PRIMARY} ${HEADER_CLASSES.LARGE}`}
					{...rest}
				>
					{text}
				</h2>
			)
		case HEADER_VARIANT.PRIMARY_H3:
			return (
				<h3
					className={`${HEADER_CLASSES.PRIMARY} ${HEADER_CLASSES.MEDIUM}`}
					{...rest}
				>
					{text}
				</h3>
			)
		case HEADER_VARIANT.PRIMARY_H4:
			return (
				<h4
					className={`${HEADER_CLASSES.PRIMARY} ${HEADER_CLASSES.SMALL}`}
					{...rest}
				>
					{text}
				</h4>
			)
		case HEADER_VARIANT.SECONDARY_H2:
			return (
				<h2
					className={`${HEADER_CLASSES.SECONDARY} ${HEADER_CLASSES.LARGE}`}
					{...rest}
				>
					{text}
				</h2>
			)
		case HEADER_VARIANT.SECONDARY_H3:
			return (
				<h3
					className={`${HEADER_CLASSES.SECONDARY} ${HEADER_CLASSES.MEDIUM}`}
					{...rest}
				>
					{text}
				</h3>
			)
		case HEADER_VARIANT.SECONDARY_H4:
			return (
				<h4
					className={`${HEADER_CLASSES.SECONDARY} ${HEADER_CLASSES.SMALL}`}
					{...rest}
				>
					{text}
				</h4>
			)
		default:
			return null
	}
}

export default Header
