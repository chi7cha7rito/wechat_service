module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: "hulk_wechat_dev",
      script: "bin/www",
      env: {
        STAGE_ENV: "dev",
        PORT: 9109
      },
      watch:true,
      cwd: ".",
      instances: "1",
      exec_mode: "cluster"
    },
    {
      name: "hulk_wechat_test",
      script: "bin/www",
      env: {
        STAGE_ENV: "test",
        PORT: 9109
      },
      cwd: ".",
      instances: "max",
      exec_mode: "cluster"
    },
    {
      name: "hulk_wechat_sim",
      script: "bin/www",
      env: {
        STAGE_ENV: "sim",
        PORT: 9109
      },
      cwd: ".",
      instances: "max",
      exec_mode: "cluster"
    },
    {
      name: "hulk_wechat_prod",
      script: "bin/www",
      env: {
        STAGE_ENV: "prod",
        PORT: 9109
      },
      cwd: ".",
      instances: "max",
      exec_mode: "cluster"
    }
  ]
}
