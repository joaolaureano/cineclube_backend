# Heroku Provider variables
variable "heroku_account_email" {}

variable "heroku_api_key" {}

# Apps variables

variable "heroku_develop_app" {}

variable "heroku_region" {}

variable "heroku_app_buildpacks" {
  type = list(string)
}

# Addons variable
variable "heroku_develop_database" {}