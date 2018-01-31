// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  accuweatherKey: 'mo4oPKzmgGBC6ExNjd9rnNUllcdLAq6L',
  googlePlacesKey: 'AIzaSyA6k8nR13XVklrbyaZP26YXYmnif9XPQ7I',
  firebaseConfig: {
    apiKey: "AIzaSyA60KAFYpMVynRrJoIHonUiXCVWUhXte6M",
    authDomain: "my-weather-forecast.firebaseapp.com",
    databaseURL: "https://my-weather-forecast.firebaseio.com",
    projectId: "my-weather-forecast",
    storageBucket: "my-weather-forecast.appspot.com",
    messagingSenderId: "213344504074"
  }
};
