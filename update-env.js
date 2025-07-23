const fs = require('fs');
const path = require('path');
const ngrok = require('ngrok');

async function updateEnv() {
  // Start ngrok (change port if needed)
  const url = await ngrok.connect(3000);

  console.log('Ngrok URL:', url);

  const envPath = path.resolve(__dirname, '.env.local');

  // Read existing env.local or create empty string
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Replace or add NEXTAUTH_URL
  const nextAuthRegex = /^NEXTAUTH_URL=.*/m;
  if (nextAuthRegex.test(envContent)) {
    envContent = envContent.replace(nextAuthRegex, `NEXTAUTH_URL=${url}`);
  } else {
    envContent += `\nNEXTAUTH_URL=${url}\n`;
  }

//   // Optionally update other URLs that use base URL (example)
//   // For example, NEXT_PUBLIC_BASE_URL
//   const baseUrlRegex = /^NEXT_PUBLIC_BASE_URL=.*/m;
//   if (baseUrlRegex.test(envContent)) {
//     envContent = envContent.replace(baseUrlRegex, `NEXT_PUBLIC_BASE_URL=${url}`);
//   } else {
//     envContent += `NEXT_PUBLIC_BASE_URL=${url}\n`;
//   }

  // Write back to .env.local
  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('.env.local updated!');
  await ngrok.disconnect();
  await ngrok.kill();
}

updateEnv().catch(console.error);
