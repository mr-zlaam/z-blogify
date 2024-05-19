let ENVIRONMENT_DEV = true;

const _config = {
  BACKEND_URI: ENVIRONMENT_DEV && (process.env.BACKEND_URI_DEV as string),
};
export const { BACKEND_URI } = _config;
