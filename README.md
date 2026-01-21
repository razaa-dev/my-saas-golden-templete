# SaaS Golden Template - Next.js + Supabase + n8n

A production-ready SaaS starter template with authentication, database, and workflow automation. Built with modern tools and best practices for rapid development and deployment.

## 🚀 Features

- ✅ **Complete Authentication System**
  - Email/Password signup and login
  - Google OAuth integration
  - Protected routes with middleware
  - User profile management

- ✅ **Modern Tech Stack**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Shadcn UI components

- ✅ **Database & Backend**
  - Supabase for database and auth
  - Row Level Security (RLS)
  - Real-time subscriptions ready
  - File storage capabilities

- ✅ **Workflow Automation**
  - n8n integration for business logic
  - Webhook endpoints for triggers
  - Test environment included
  - Scalable workflow architecture

- ✅ **Production Ready**
  - Vercel deployment optimized
  - Environment variable management
  - Error handling and logging
  - SEO and performance optimized

## 🏁 Quick Start

### 1. Use This Template

Click the "Use this template" button on GitHub, or clone directly:

```bash
git clone https://github.com/YOUR_USERNAME/my-saas-golden-template.git my-new-saas
cd my-new-saas
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in your actual values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_N8N_WEBHOOK_URL=/api/workflows/
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL script from `init-database.sql` in your Supabase SQL editor
3. Enable Google Auth in Authentication → Providers
4. Copy your project URL and anon key to `.env.local`

### 4. Configure Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add your Supabase callback URL to authorized redirects
4. Add Client ID and Secret to Supabase Auth settings

### 5. Start Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your SaaS!

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |
| `NEXT_PUBLIC_SITE_URL` | Your site's URL for redirects | `https://myapp.vercel.app` |
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | n8n webhook base URL | `/api/workflows/` or `https://n8n.mysite.com/webhook/` |

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality component library

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication & authorization
  - Real-time subscriptions
  - File storage
  - Row Level Security

### Automation & Workflows
- **n8n** - Workflow automation platform
- **Custom API Routes** - Next.js API endpoints
- **Webhook Integration** - Event-driven automation

### Deployment
- **Vercel** - Frontend hosting and deployment
- **GitHub** - Version control and CI/CD

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   ├── signup/        # Signup page
│   │   │   └── callback/      # OAuth callback
│   │   ├── dashboard/         # Protected dashboard
│   │   ├── test-workflows/    # n8n testing page
│   │   ├── api/               # API routes
│   │   │   └── workflows/     # Webhook endpoints
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   │   ├── auth/              # Auth-related components
│   │   └── ui/                # Shadcn UI components
│   ├── lib/                   # Utility libraries
│   │   ├── supabase/          # Supabase clients & types
│   │   ├── n8n/               # n8n integration
│   │   └── utils.ts           # Helper functions
│   └── middleware.ts          # Route protection
├── init-database.sql          # Database schema
├── components.json            # Shadcn UI config
└── README.md                  # This file
```

## 🚀 Deploy to Vercel

### 1. Connect to GitHub

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository

### 2. Configure Environment Variables

In your Vercel dashboard:

1. Go to Settings → Environment Variables
2. Add all variables from your `.env.local`
3. Make sure to update `NEXT_PUBLIC_SITE_URL` to your Vercel domain

### 3. Deploy

```bash
# Or deploy from command line
npm install -g vercel
vercel --prod
```

### 4. Update OAuth Settings

Update your Google OAuth and Supabase settings with your new production URL.

## 🔄 n8n Workflow Setup

### Option 1: Use Mock Endpoints (Development)

The template includes mock webhook endpoints for testing:

- Visit `/test-workflows` to test workflow triggers
- Uses internal API routes at `/api/workflows/test`
- Perfect for development and prototyping

### Option 2: Connect Real n8n Instance

1. **Self-hosted n8n:**
   ```bash
   # Using Docker
   docker run -d --name n8n -p 5678:5678 n8nio/n8n
   ```

2. **n8n Cloud:**
   - Sign up at [n8n.cloud](https://n8n.cloud)
   - Create workflows with webhook triggers

3. **Update Environment:**
   ```env
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/
   ```

### Creating Workflows

1. Create a new workflow in n8n
2. Add a "Webhook" trigger node
3. Configure your workflow logic
4. Note the webhook URL
5. Use the workflow ID in your app

Example workflow trigger:

```typescript
import { triggerN8nWorkflow } from '@/lib/n8n/client'

const result = await triggerN8nWorkflow('user-signup', {
  email: user.email,
  name: user.name,
  plan: 'pro'
})
```

## 🎨 Customization Guide

### 1. Branding

Update these files for your brand:

- `src/app/page.tsx` - Homepage content
- `src/app/layout.tsx` - Site title and metadata
- `src/app/globals.css` - Custom CSS variables
- `tailwind.config.ts` - Brand colors and themes

### 2. Database Schema

Modify `init-database.sql` to add your tables:

```sql
-- Example: Add a products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2),
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Users can view own products" ON products
  FOR SELECT USING (auth.uid() = user_id);
```

### 3. Add New Features

The template provides a solid foundation. Common additions:

- **Stripe Integration:** Add payment processing
- **Email Service:** Connect SendGrid or Resend
- **File Uploads:** Use Supabase Storage
- **Analytics:** Add PostHog or Mixpanel
- **Admin Panel:** Create admin-only routes

### 4. Styling

The template uses Tailwind and Shadcn UI:

- Modify `tailwind.config.ts` for custom themes
- Add new Shadcn components: `npx shadcn@latest add button`
- Create custom components in `src/components/`

## 🤝 Contributing

This template is meant to be customized for your needs. If you create useful improvements:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📝 License

MIT License - feel free to use this template for any project!

## 🆘 Support

- **Documentation:** Check the inline code comments
- **Issues:** Report bugs on the GitHub Issues page
- **Community:** Join discussions in GitHub Discussions

---

**Built with ❤️ for the indie hacker community**

Start building your SaaS today! 🚀
