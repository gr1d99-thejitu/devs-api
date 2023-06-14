declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'test' | 'development' | 'production'
      PORT: number
      PWD: string
    }
  }
}
