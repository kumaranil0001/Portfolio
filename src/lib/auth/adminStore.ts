import fs from 'fs';
import path from 'path';
import { serverSupabase } from '@/lib/supabase/server';

const CONFIG_FILE = path.join(process.cwd(), '.admin-secret.json');
const ENV_FILE = path.join(process.cwd(), '.env.local');

// Primary owner credentials
export const OWNER_EMAIL = 'anilkumarrout2005@gmail.com';
export const OWNER_MONIKER = 'anil404';

// Check if identity belongs to the portfolio owner
export function isOwnerIdentity(identity: string): boolean {
  if (!identity) return false;
  const clean = identity.trim().toLowerCase();
  const configuredEmail = (process.env.ADMIN_EMAIL || OWNER_EMAIL).toLowerCase();
  
  return (
    clean === OWNER_EMAIL.toLowerCase() ||
    clean === 'anilcollage001@gmail.com' || // legacy backup alias
    clean === OWNER_MONIKER.toLowerCase() ||
    clean === configuredEmail ||
    clean === 'admin'
  );
}

// Get the active master password
export function getActiveAdminPassword(): string {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      if (data && data.password) {
        return data.password;
      }
    }
  } catch {
    // Fall back to env
  }

  return process.env.ADMIN_SECRET_KEY || 'admin123456';
}

// Change the admin password and persist to disk
export async function updateAdminPassword(oldPassword: string, newPassword: string): Promise<{ success: boolean; message?: string; error?: string }> {
  const currentPassword = getActiveAdminPassword();

  if (oldPassword !== currentPassword) {
    return { success: false, error: 'Current password does not match. Please verify your existing password.' };
  }

  if (!newPassword || newPassword.trim().length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  const cleanNew = newPassword.trim();

  // 1. Write to persistent .admin-secret.json
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({
      password: cleanNew,
      updatedAt: new Date().toISOString(),
      updatedBy: OWNER_EMAIL
    }, null, 2), 'utf8');
  } catch (err: unknown) {
    console.error('Failed to write .admin-secret.json:', err);
  }

  // 2. Update .env.local if it exists
  try {
    if (fs.existsSync(ENV_FILE)) {
      let content = fs.readFileSync(ENV_FILE, 'utf8');
      if (content.includes('ADMIN_SECRET_KEY=')) {
        content = content.replace(/ADMIN_SECRET_KEY=.*/g, `ADMIN_SECRET_KEY=${cleanNew}`);
      } else {
        content += `\nADMIN_SECRET_KEY=${cleanNew}\n`;
      }
      fs.writeFileSync(ENV_FILE, content, 'utf8');
    }
  } catch (err: unknown) {
    console.error('Failed to update .env.local:', err);
  }

  // 3. Update runtime environment variable
  process.env.ADMIN_SECRET_KEY = cleanNew;

  // 4. Also try updating Supabase Auth user password if available
  try {
    if (serverSupabase) {
      await serverSupabase.auth.updateUser({ password: cleanNew });
    }
  } catch {
    // Supabase optional sync
  }

  return { success: true, message: 'Password updated successfully! Use your new password for all future logins.' };
}

// Verify single-owner credentials
export async function verifyOwnerCredentials(identity: string, password: string): Promise<{ allowed: boolean; user?: { email: string; moniker: string; role: string }; error?: string }> {
  // 1. Strict Owner identity check
  if (!isOwnerIdentity(identity)) {
    return {
      allowed: false,
      error: `Access Denied: This is the private portfolio of Anil Kumar Rout (${OWNER_EMAIL}). Only the portfolio owner is authorized to access the control center.`
    };
  }

  const activePassword = getActiveAdminPassword();

  // 2. Check against stored master password
  if (password === activePassword) {
    return {
      allowed: true,
      user: {
        email: OWNER_EMAIL,
        moniker: OWNER_MONIKER,
        role: 'owner'
      }
    };
  }

  // 3. Fallback check with Supabase Auth for the owner
  if (serverSupabase) {
    try {
      const { data, error } = await serverSupabase.auth.signInWithPassword({
        email: OWNER_EMAIL,
        password: password
      });

      if (!error && data.user) {
        return {
          allowed: true,
          user: {
            email: OWNER_EMAIL,
            moniker: OWNER_MONIKER,
            role: 'owner'
          }
        };
      }
    } catch {
      // Supabase verification failed
    }
  }

  return {
    allowed: false,
    error: 'Incorrect security password. Please enter your valid admin password.'
  };
}
