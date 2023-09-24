export const enum ENodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

interface IEnv {
  NODE_ENV: ENodeEnv
}

export const env: Readonly<IEnv> = {
  NODE_ENV: process.env.NODE_ENV as ENodeEnv
}
