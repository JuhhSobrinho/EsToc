const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://weclvdvglvshafxhgkyv.supabase.co', // URL do Supabase
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlY2x2ZHZnbHZzaGFmeGhna3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MTQ4MDksImV4cCI6MjA2MTA5MDgwOX0.nBLnV6I_-cwODiTpJUTYhVEm7HPB1vqyM1x2XowqDJM' // Sua chave pública
);

module.exports = supabase;