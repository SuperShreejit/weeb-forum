export enum QUERIES {
  USER_PROFILE = 'user-profile',
  REGISTER = 'user-register',
  TIMELINE = 'user-timeline',
  VIEW_POST = 'post',
}

export enum QUERY_ERRORS {
	FETCH_USER_FAILED = 'Failed to fetch user profile',
}

export const queryOptions = {
	cacheTime: 15 * 1000,
	staleTime: 15 * 1000,
}