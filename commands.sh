#!/usr/bin/env bash

# To run these functions: `. ./commands.sh && <method_name> <optional_param_1> <optional_param_2>`

function add_package { # `. ./commands.sh && add_package mynewpackage`
  packageNamespace="@ultimate"

  if [ -z "$1" ]; then
    echo "No package name provided."
    read -p "Please enter the package name: " packageName
  else
    packageName="$1"
  fi

  git clone --depth 0 https://github.com/olivercaine/typescript-library-boilerplate.git -b v20250325001649 packages/$packageName && rm -rf packages/$packageName/.git
  # cp -r packages/package packages/$packageName
  sed -i.bak "s/\"name\": \".*\"/\"name\": \"$packageNamespace\/$packageName\"/" packages/$packageName/package.json
  rm "packages/$packageName/package.json.bak"
  # rm "packages/$packageName/package-lock.json"
  pnpm install && pnpm run build --filter $packageNamespace/$packageName
}
