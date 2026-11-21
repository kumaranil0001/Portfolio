import fs from 'fs';
import path from 'path';

const newPassword = process.argv[2] || 'admin123456';
const OWNER_EMAIL = 'anilkumarrout2005@gmail.com';

const CONFIG_FILE = path.join(process.cwd(), '.admin-secret.json');
const ENV_FILE = path.join(process.cwd(), '.env.local');

console.log('==============================================');
console.log('ANIL404 CMS // EMERGENCY PASSWORD RESET UTILITY');
console.log('==============================================\n');

// 1. Update .admin-secret.json
fs.writeFileSync(CONFIG_FILE, JSON.stringify({
  password: newPassword,
  updatedAt: new Date().toISOString(),
  updatedBy: OWNER_EMAIL
}, null, 2), 'utf8');

// 2. Update .env.local
if (fs.existsSync(ENV_FILE)) {
  let content = fs.readFileSync(ENV_FILE, 'utf8');
  if (content.includes('ADMIN_SECRET_KEY=')) {
    content = content.replace(/ADMIN_SECRET_KEY=.*/g, `ADMIN_SECRET_KEY=${newPassword}`);
  } else {
    content += `\nADMIN_SECRET_KEY=${newPassword}\n`;
  }
  if (content.includes('ADMIN_EMAIL=')) {
    content = content.replace(/ADMIN_EMAIL=.*/g, `ADMIN_EMAIL=${OWNER_EMAIL}`);
  }
  fs.writeFileSync(ENV_FILE, content, 'utf8');
}

console.log(`✓ Owner Email: ${OWNER_EMAIL}`);
console.log(`✓ New Passkey Set: "${newPassword}"`);
console.log(`✓ Updated Files: .env.local & .admin-secret.json`);
console.log('\nYou can now log in immediately at http://localhost:3000/admin/login with this passkey!\n');
