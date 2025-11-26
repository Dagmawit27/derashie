/*
  # Non-Profit Organization Database Schema

  ## Overview
  Creates tables for a non-profit organization website working with children and women,
  partnered with Plan International.

  ## New Tables

  ### 1. `programs`
  Stores information about programs offered by the organization
  - `id` (uuid, primary key)
  - `title` (text) - Program name
  - `description` (text) - Detailed program description
  - `category` (text) - Program category for filtering (e.g., "Children", "Women", "Education")
  - `image_url` (text) - URL to program image
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. `news_stories`
  Stores success stories and news articles
  - `id` (uuid, primary key)
  - `title` (text) - Story/article title
  - `content` (text) - Full story content
  - `excerpt` (text) - Short preview text
  - `category` (text) - Story type ("success_story" or "news")
  - `image_url` (text) - Featured image URL
  - `published_date` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `volunteers`
  Stores volunteer signup information
  - `id` (uuid, primary key)
  - `full_name` (text) - Volunteer's full name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone number
  - `interest_area` (text) - Area of interest for volunteering
  - `message` (text) - Additional message from volunteer
  - `created_at` (timestamptz) - Signup timestamp

  ### 4. `contact_submissions`
  Stores contact form submissions
  - `id` (uuid, primary key)
  - `name` (text) - Sender's name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone number
  - `subject` (text) - Message subject
  - `message` (text) - Message content
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Public can read programs and news stories
  - Public can insert volunteer signups and contact submissions
  - Only authenticated users can view volunteer and contact data
*/

CREATE TABLE IF NOT EXISTS public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow anyone (even anon) to SELECT
CREATE POLICY "Anyone can view gallery images"
  ON public.gallery_images
  FOR SELECT
  USING (true);

  
-- Programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view programs"
  ON programs FOR SELECT
  USING (true);

-- News and stories table
CREATE TABLE IF NOT EXISTS news_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  category text NOT NULL DEFAULT 'news',
  image_url text DEFAULT '',
  published_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view news and stories"
  ON news_stories FOR SELECT
  USING (true);

-- Volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  interest_area text DEFAULT '',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit volunteer signup"
  ON volunteers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view volunteers"
  ON volunteers FOR SELECT
  TO authenticated
  USING (true);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO programs (title, description, category, image_url) VALUES
  ('Girls Education Initiative', 'Empowering girls through quality education and mentorship programs. We provide scholarships, school supplies, and educational support to ensure every girl has access to learning opportunities.', 'Education', 'https://images.pexels.com/photos/8500285/pexels-photo-8500285.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Women''s Empowerment Program', 'Supporting women through skills training, microfinance, and leadership development. Our program helps women gain financial independence and confidence.', 'Women', 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Child Protection Services', 'Creating safe environments for children through community education and protection systems. We work to prevent violence and exploitation.', 'Children', 'https://images.pexels.com/photos/8363099/pexels-photo-8363099.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Healthcare Access Program', 'Providing essential healthcare services and health education to underserved communities. Focus on maternal and child health.', 'Health', 'https://images.pexels.com/photos/8460165/pexels-photo-8460165.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Youth Leadership Training', 'Developing the next generation of leaders through training, workshops, and mentorship opportunities for young people.', 'Youth', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Nutrition and Food Security', 'Ensuring children and families have access to nutritious food and education about healthy eating habits.', 'Health', 'https://images.pexels.com/photos/6646914/pexels-photo-6646914.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT DO NOTHING;

INSERT INTO news_stories (title, content, excerpt, category, image_url, published_date) VALUES
  ('Maria''s Journey to Becoming a Teacher', 'Maria grew up in a small village with limited access to education. Through our Girls Education Initiative, she received a scholarship and mentorship support. Today, at age 24, Maria has completed her university education and returned to her village as a teacher, inspiring the next generation of girls. "This organization believed in me when I didn''t believe in myself," Maria shares. "Now I want to give back and help other girls achieve their dreams." Her story represents the transformative power of education and the ripple effect of supporting one girl. Maria now teaches 45 students and runs weekend literacy programs for women in her community.', 'From scholarship recipient to inspiring teacher, Maria''s story shows the transformative power of education support.', 'success_story', 'https://images.pexels.com/photos/8363026/pexels-photo-8363026.jpeg?auto=compress&cs=tinysrgb&w=800', now() - interval '5 days'),
  ('Women''s Co-op Transforms Local Economy', 'A group of 30 women in the northern region have formed a successful agricultural cooperative with support from our Women''s Empowerment Program. Starting with micro-loans and business training, the co-op now generates sustainable income for all members and employs 15 additional workers. The women have gained financial independence, increased their families'' food security, and become role models in their community. The co-op recently expanded to include a small processing facility, adding value to their products. "We are not just earning money, we are changing our families'' futures," says cooperative leader Amina. The success has inspired three additional co-ops in neighboring villages.', 'Thirty women create thriving agricultural business through micro-finance and skills training support.', 'success_story', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', now() - interval '12 days'),
  ('New Partnership with Plan International Announced', 'We are excited to announce an expanded partnership with Plan International to reach 10,000 more children and families over the next three years. This collaboration will focus on education, child protection, and economic empowerment initiatives. Together, we will work to ensure every child, especially girls, can learn, lead, decide, and thrive. The partnership brings additional resources, expertise, and international best practices to our programs. Joint initiatives will launch in six regions starting next month, with a particular focus on the most vulnerable communities. This represents a significant milestone in our mission to create lasting change.', 'Expanded collaboration will impact 10,000 children and families through education and empowerment programs.', 'news', 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800', now() - interval '3 days'),
  ('Annual Volunteer Appreciation Event', 'Last Saturday, we celebrated our incredible volunteers who contribute over 5,000 hours annually to support our mission. The event featured success stories, community performances, and recognition awards. Our volunteers are the heart of our organization, providing tutoring, mentoring, administrative support, and program assistance. Special recognition went to volunteers who have served for over five years. "Volunteering here has enriched my life as much as I hope I''ve helped others," shared long-time volunteer James. We are always welcoming new volunteers to join our growing community of changemakers.', 'Celebrating dedicated volunteers who contribute thousands of hours to support children and women.', 'news', 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800', now() - interval '7 days')
ON CONFLICT DO NOTHING;

-- Insert sample data for gallery_images
INSERT INTO gallery_images (title, image_url) VALUES
  ('Women in a training session', './image/photo_1.jpg'),
  ('Women in a training session', './image/photo_2.jpg'),
  ('Girl studying outside', './image/photo_3.jpg'),
  ('Children smiling in school', './image/photo_4.jpg'),
  ('Community workshop', './image/photo_9.jpg'),
  ('Adult and child bonding', './image/photo_8.jpg'),
  ('Adult and child bonding', './image/photo_12.jpg')
ON CONFLICT DO NOTHING;