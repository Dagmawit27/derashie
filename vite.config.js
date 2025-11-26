import { defineConfig } from 'vite'

// Sets a default base for deployments and allows overriding with DEPLOY_BASE env var.
// Useful when deploying to GitHub Pages at https://<user>.github.io/<repo>/
// Example: For this repo, the default base is '/derashie/'.

export default defineConfig(({ command, mode }) => {
  return {
    base: process.env.DEPLOY_BASE || '/derashie/'
  }
})
