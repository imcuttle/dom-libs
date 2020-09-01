const port = process.env.TEST_SERVER_PORT ? Number(process.env.TEST_SERVER_PORT) : 8888

process.env.TEST_SERVER_PORT = port

module.exports = {
  launch: {
    headless: process.env.CI === 'true'
  },
  browserContext: process.env.INCOGNITO ? 'incognito' : 'default',
  server: {
    command: `TEST_SERVER_PORT=${port} npx webpack-dev-server`,
    port,
    launchTimeout: 4000
  }
}
