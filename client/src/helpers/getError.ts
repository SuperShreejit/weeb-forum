const getError = (error: unknown) => error instanceof Error ? error.message : error

export default getError