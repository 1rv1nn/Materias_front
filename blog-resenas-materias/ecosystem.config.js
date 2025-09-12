module.exports = {
  apps: [{
    name: "blog-resenas-materias",
    script: "sh",
    args: "-c 'serve -s /app/dist -l 3000'",
    exec_mode: "fork",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production"
    }
  }]
}