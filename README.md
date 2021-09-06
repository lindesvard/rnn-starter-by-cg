## Getting Started

#### Quick start with [cli-rn](https://github.com/kanzitelli/cli-rn)

```bash
> npm i -g cli-rn
> cli-rn new AppName
```

If you encounter any problems with `cli-rn`, please open an issue.

If you have any troubles running the app with `yarn ios` or `yarn android`, open XCode or Android Studio and run the project from there.

#### Manual setup

1. Clone the repo

```bash
> git clone https://github.com/kanzitelli/rnn-starter.git AppName && cd AppName
```

2. Remove `.git` file (if not planning to contribute)

```bash
> rm -rf .git
```

3. Install packages and pods

```bash
> yarn && yarn ios:pods
```

4. Run it!

Open XCode or Android Studio to run the project (recommended) or do

```bash
> yarn ios
> yarn android
```

If you need to rename the app, do the following (based on [react-native-rename](https://github.com/junedomingo/react-native-rename)):

```bash
> yarn rename NewAppName
> yarn ios:pods
```

## License

This project is [MIT licensed](/LICENSE.md)
