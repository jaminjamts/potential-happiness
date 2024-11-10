//front-end
url https://self-try.vercel.app/
deploy code - npx vercel --prod
//back-end
url https://potential-happiness.onrender.com
deploy code - gitluu push hiigdehed shuud shinechlegdene
///create tables
CREATE TABLE "users" (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
email VARCHAR(20) UNIQUE NOT NULL,
name VARCHAR(25) NOT NULL,
password VARCHAR(25) NOT NULL,
created TIMESTAMP DEFAULT current_timestamp,
updated TIMESTAMP DEFAULT current_timestamp
)
