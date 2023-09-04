import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://iuvcwacfghirzwzfjjzt.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dmN3YWNmZ2hpcnp3emZqanp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxNjIwMTgsImV4cCI6MjAwODczODAxOH0.m6UWXmJjARxtWZyoPpIrwlPyLkhCx6n0RrrQOW2vFcg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
