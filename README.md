## RNN Starter

This is a **forked** repository from https://github.com/kanzitelli/rnn-starter

I have done changes what I prefer.

## Getting Started

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
