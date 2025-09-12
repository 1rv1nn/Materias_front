module.exports = {
  apps: [{
    name: "blog-resenas-materias",
    script: "serve",
    args: "-s dist -l 3000",
    exec_mode: "cluster",
    instances: "max",
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production"
    }
  }]
}