# Heroku apps

resource "heroku_app" "develop" {
  name   = "${var.heroku_develop_app}"
  region = "${var.heroku_region}"

  config_vars = {
    APP_ENV = "develop"
  }

  buildpacks = "${var.heroku_app_buildpacks}"
}