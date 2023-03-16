module.exports = {
  apps: [
    {
      name: 'Unveil',
      // instances: 'max', // Or a number of instances, MAX is 8
      script: './node_modules/next/dist/bin/next',
      env_local: {
        APP_ENV: 'local' // APP_ENV=local
      },
      env_development: {
        APP_ENV: 'dev' // APP_ENV=dev
      },
      env_production: {
        APP_ENV: 'prod' // APP_ENV=prod
      }
    }
  ]
}