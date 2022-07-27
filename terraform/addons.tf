resource "heroku_addon" "develop" {
  app_id = heroku_app.develop.id
  plan = "${var.heroku_develop_database}"
}

