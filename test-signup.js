import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://owhsjcqhnnsjirrpypds.supabase.co';
const SUPABASE_KEY = 'sb_publishable_a0KhOgRRcqNJSAq4H8ieKw_fIWRausn'; // anon key from .env

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testSignup() {
  const email = `test-${Date.now()}@example.com`;
  console.log(`Attempting to sign up with ${email}...`);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'SuperSecurePassword2026!'
  });
  
  if (error) {
    console.error('Signup Error:', error);
    return;
  }
  
  console.log('Signup Response Data:', data);
  
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    console.log('NOTE: User already exists but maybe not confirmed?');
  } else if (data.session === null) {
    console.log('NOTE: Session is null! This means EMAIL CONFIRMATION IS REQUIRED in this Supabase project.');
  } else {
    console.log('NOTE: Session exists! Email confirmation is OFF, you should be logged in automatically.');
  }
  
  console.log('Now attempting to log in immediately...');
  const loginRes = await supabase.auth.signInWithPassword({
    email,
    password: 'SuperSecurePassword2026!'
  });
  
  if (loginRes.error) {
    console.error('Login Error:', loginRes.error);
  } else {
    console.log('Login Success! You are in.');
  }
}

testSignup();
