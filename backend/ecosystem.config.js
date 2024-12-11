require('dotenv').config({ path: `.env.deploy` });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_PRIVATE_KEY, DEPLOY_REF, DEPLOY_REPO, DEPLOY_NPM_PATH
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
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: DEPLOY_PRIVATE_KEY,
      'pre-deploy-local': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH} ${DEPLOY_PRIVATE_KEY}`,
      'post-deploy': `cd backend && export PATH=$PATH:${DEPLOY_NPM_PATH} && npm i && npm run build && pm2 startOrRestart ecosystem.config.js`,
    },
  },
};
