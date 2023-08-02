# promise-until
Javascript promises you can cancel 

## Installtion
With NPM
```
npm i @cloud-smith/promise-until
```
With Yarn
```
yarn add @cloud-smith/promise-until
```

## Example

```
import { promiseUntil, dummyTask } from '@cloud-smith/promise-until';

promiseUntil(async (resolve, reject) => {
  await dummyTask({ delay: 2000 })
    .then(resolve)
    .catch(reject);
})
  .until(1000)
  .then(results => {
    console.log('then: ', results);
  })
  .catch(error => {
    console.error('catch: ', error);
  })
  .finally(() => {
    console.log('finally!');
  });
```

- The promise resolver (dummyTask) can only resolve up until the "until" timeout value has been reached.
- After the "until" value is reached, nither then or catch will fire.
- Finally will always fire, imediately following then/catch or until.

## The Dummy Function
For demonstration, we can use a dummy promises that succeeds or fails after a delay, just like a real fetch request.

```
export const dummyTask = ({ delay, shouldFail, state }: {
  delay: number;
  shouldFail?: Boolean;
  state?: any;
}) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (state) console.log('Task State: ', state);
    if (shouldFail) reject(`Task simulated failure`);
    else resolve(`Task Success`);
  }, delay);
});
```