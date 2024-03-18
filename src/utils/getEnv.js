import config from 'config';

// eslint-disable-next-line
export function getEnv(envName) {
  return config.get(envName);
}
