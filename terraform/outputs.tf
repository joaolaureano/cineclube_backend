# Resources outputs
output "develop_git_url" {
  value = "${heroku_app.develop.git_url}"
}