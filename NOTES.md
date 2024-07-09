# Dev

## Pre-requisites

1. [NVM](https://github.com/nvm-sh/nvm)

```
nvm use # or just manually install version in .nvmrc file
pnpm store prune
pnpm install
pnpm build
pnpm dev
```

# Build

## Pre-requisites

1. Account on [expo.dev](https://expo.dev)

```
cd ./apps/mobile
eas build --profile preview -p android
```

# Troubleshooting

## Expo version is out of date

Expo (the app build too) updates frequently and often requires upgrading.
To do this,

```
nvm use
cd ./apps/mobile
pnpm up expo
```

## Cannot determine SDK version when building in Expo

**Error**

CommandError: Cannot determine which native SDK version your project uses because the module `expo` is not installed. Please install it with `yarn add expo` and try again.

**Cause**

**Solution**