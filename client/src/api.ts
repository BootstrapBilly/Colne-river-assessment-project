export let apiUrl = 'https://crap-api-635719a27ef1.herokuapp.com';

if (import.meta.env.PROD) {
  apiUrl = 'https://crap-api-prod-2e20909e19a5.herokuapp.com';
}
