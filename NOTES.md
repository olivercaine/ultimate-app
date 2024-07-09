# Pre-requisites

Expo (the app build too) updates frequently and often requires upgrading.
To do this,

```
nvmu
cd ./apps/mobile
pnpm up expo@49
```

# Dev

```
nvmu
pnpm store prune
pnpm install
pnpm build
pnpm dev
```

# Build (requires account on expo.dev)

```
cd ./apps/mobile
eas build --profile preview -p android
```
