## Dev

### Pre-requisites

1. [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)

```
nvm use
pnpm store prune
pnpm install
pnpm lint
pnpm test
pnpm build
pnpm dev
```

```
cd ./apps/mobile
npx expo install --check
npx -y expo-doctor
eas build --profile preview -p android
```

## Build

### Pre-requisites

1. Account on [expo.dev](https://expo.dev)

```
cd ./apps/mobile
eas build --profile preview -p android
```

## Installing to devices

Android: install using [Obtanium](https://github.com/ImranR98/Obtainium/releases/tag/v1.1.15)

iOS: instructions coming soon

## Troubleshooting

### "Expo version is out of date" or "Cannot determine SDK version when building in Expo"

**Error**

CommandError: Cannot determine which native SDK version your project uses because the module `expo` is not installed. Please install it with `yarn add expo` and try again.

**Cause**

Expo (the app build too) updates frequently and often requires upgrading.

**Solution**

Try bumping the Expo version with:

```
nvm use
cd ./apps/mobile
pnpm up expo --latest
```
