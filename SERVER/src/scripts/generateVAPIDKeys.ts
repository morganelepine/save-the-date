import webpush from "web-push";

const keys = webpush.generateVAPIDKeys();
console.log(keys);

// npx ts-node/esm src/generateVAPIDKeys.ts
// https://vapidkeys.com/
