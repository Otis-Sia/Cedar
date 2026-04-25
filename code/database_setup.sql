-- 1. Add role column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- 2. Create student_domains table
CREATE TABLE IF NOT EXISTS student_domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    plan TEXT,
    status TEXT,
    amount INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable RLS (Optional but recommended)
ALTER TABLE student_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- 5. Create policy for admins to manage domains
CREATE POLICY "Admins can manage student domains" 
ON student_domains 
FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() AND users.role = 'admin'
    )
);

-- 6. Create policy for everyone to read domains (for verification)
CREATE POLICY "Anyone can read student domains" 
ON student_domains 
FOR SELECT 
TO authenticated, anon
USING (true);

-- 7. Create policy for admins to view all subscriptions
CREATE POLICY "Admins can view all subscriptions" 
ON subscriptions 
FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() AND users.role = 'admin'
    )
);

-- 8. To make yourself an admin, run this replacing your email:
-- UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
