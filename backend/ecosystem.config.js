require('dotenv').config({ path: `.env.deploy` });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_PRIVATE_KEY, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/ioann7/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy': `scp -i ${DEPLOY_PRIVATE_KEY} .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build',
      key: DEPLOY_PRIVATE_KEY,
    },
  },
};
