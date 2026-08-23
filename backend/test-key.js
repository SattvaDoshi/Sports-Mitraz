require('dotenv').config();
const key = process.env.GOOGLE_PRIVATE_KEY;
console.log('Length:', key ? key.length : 'undefined');
if (key) {
  console.log('Has quotes:', key.startsWith('"'));
  console.log('Has literal \\n:', key.includes('\\n'));
  
  const parsedKey = key.replace(/\\n/g, '\n');
  console.log('Parsed valid key?', parsedKey.startsWith('-----BEGIN PRIVATE KEY-----') && parsedKey.endsWith('-----END PRIVATE KEY-----\n'));
  console.log(parsedKey.slice(0, 30));
  console.log(parsedKey.slice(-30));
}
