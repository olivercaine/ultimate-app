#!/usr/bin/env bash

# To run these functions: `. ./commands.sh && <method_name> <optional_param_1> <optional_param_2>`

function add_package { # `. ./commands.sh && add_package`
  echo "Please supply the name for the new package:"
  read packageName

  if [ -z "$packageName" ]; then
    echo "Error: No package name entered. Exiting..."
    exit 1
  fi

  git clone https://github.com/olivercaine/typescript-library-boilerplate.git packages/$packageName && rm -rf packages/$packageName/.git
  sed -i.bak "s/\"name\": \".*\"/\"name\": \"@olliecaine\/$packageName\"/" packages/$packageName/package.json
}