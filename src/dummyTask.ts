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
