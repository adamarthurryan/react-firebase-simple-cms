import {environment} from 'react-router-component'

/* Just a wrapper for the somewhat hacky and undocumented use of react-router-component's environment object.*/
export function navigate(path) {
  environment.defaultEnvironment.navigate(path);
}