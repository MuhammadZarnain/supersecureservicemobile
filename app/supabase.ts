import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tfrnrryaupdwvwyrdycu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmcm5ycnlhdXBkd3Z3eXJkeWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0ODU3ODQsImV4cCI6MjA1MTA2MTc4NH0.fEjG0nzhtXtodV0MU81H1zDWtpyjqM_nSafnMPg2d2M';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
