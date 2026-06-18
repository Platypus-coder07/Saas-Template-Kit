# 🚀 Todo Master

> **Less Organization. More Execution.**

Todo Master is a premium task execution platform engineered around cognitive clarity, intentional focus, and sustainable productivity.

Unlike traditional productivity suites that encourage endless categorization, labels, and management overhead, Todo Master enforces a simple execution loop:

**Capture → Focus → Execute → Reset**

The goal is simple: help users spend less time managing tasks and more time completing meaningful work.

---

## ✨ Core Philosophy

Most productivity tools optimize for organization.

Todo Master optimizes for execution.

By introducing intentional constraints, automatic backlog management, and AI-assisted planning, Todo Master helps users maintain momentum without accumulating productivity debt.

---

# ⚡ Core Features

## 📥 Inbox Bucket

A low-friction capture system designed to instantly store thoughts, ideas, and tasks before they create mental clutter.

* Rapid task capture
* Zero categorization friction
* Clear working memory instantly

---

## 🎯 Today's Focus

A dedicated execution zone designed around intentional scarcity.

Free users are limited to **3 active focus tasks** to prevent task hoarding and encourage completion.

* Clear daily priorities
* Reduced context switching
* Focused execution environment

---

## 🌙 Midnight Daily Reset

Every day begins with a clean slate.

At midnight, unfinished focus tasks are automatically transferred to the Backlog Stream.

This prevents users from carrying yesterday's unfinished work into today.

* Automatic backlog management
* Fresh daily workspace
* Reduced productivity anxiety

---

## 🤖 Gemini AI Task Breakdown

Integrated AI assistance powered by Google's Gemini models.

Complex objectives are automatically transformed into smaller actionable tasks.

Examples:

* Build Portfolio Website
* Launch SaaS Product
* Prepare For Interview

becomes

* Design Landing Page
* Create Authentication Flow
* Implement Database Schema
* Deploy Production Build

---

## 🧠 Smart Prioritization Engine

Context-aware prioritization algorithms help surface meaningful work based on impact rather than arbitrary labels.

* Intelligent ranking
* Reduced decision fatigue
* Higher execution velocity

---

# 🏗 Product Workflow

Todo Master follows a structured execution loop:

```text
💭 Thought
      ↓
📥 Inbox
      ↓
🎯 Focus
      ↓
⚡ Execute
      ↓
✅ Complete
      ↓
🌙 Reset
```

This system minimizes mental clutter while maintaining consistent forward progress.

---

# 🛠 Tech Stack

## Frontend

* Next.js 15 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* Framer Motion

## Backend

* Next.js Route Handlers
* Prisma ORM
* PostgreSQL

## Authentication

* Clerk

## Payments

* Stripe

## AI

* Gemini AI

## Animations

* Framer Motion
* Lottie React

---

# 🎨 Design System

Todo Master follows a minimalist editorial design language.

### Colors

```css
Background: #F4F1E8
Primary: #8FB8A8
Text: #161616
Surface: #FFFFFF
```

### Design Principles

* Minimal interfaces
* Strong typography
* Cognitive clarity
* Intentional spacing
* Reduced visual noise

---

# 🔐 Authentication Architecture

Authentication is powered by Clerk and customized for Todo Master's workflow.

## Features

* Route protection
* Session management
* Sign-in / Sign-up flows
* Multi-factor authentication support
* Device trust verification
* Custom authentication UI

## Middleware Protection

Protected routes:

```bash
/dashboard
/settings
/billing
```

Unauthenticated users are redirected automatically.

---

# 💳 Billing Architecture

Todo Master Pro is powered by Stripe subscriptions.

### Pro Plan

```text
$9.99 / month
```

Features include:

* Unlimited Tasks
* Advanced Analytics
* Focus History
* AI Task Breakdown
* Smart Prioritization
* Future Premium Features

---

## Stripe Webhook Events

### checkout.session.completed

Immediately upgrades users to Pro.

### invoice.payment_succeeded

Extends billing periods and refreshes subscription state.

### customer.subscription.deleted

Downgrades the account while preserving all user data.

---

# 🔒 Webhook Security

All incoming Stripe events are verified using cryptographic signature validation.

```ts
stripe.webhooks.constructEvent(
  body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

This prevents spoofed requests and unauthorized subscription modifications.

---

# 🌍 Environment Variables

Create a `.env` file in the root directory.

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@host:port/db?schema=public"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stripe
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_...

# Gemini AI
GEMINI_API_KEY=your_api_key
```

---

# 💻 Local Development Setup

## 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

---

## 2. Generate Prisma Client

```bash
npx prisma generate
```

---

## 3. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

---

## 4. Launch Prisma Studio (Optional)

```bash
npx prisma studio
```

---

## 5. Configure Stripe Webhooks

Install Stripe CLI.

Login:

```bash
stripe login
```

Start webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the generated signing secret and place it inside:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

## 6. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🚀 Production Build

Before deployment, validate the project with a production build.

```bash
npm run build
```

This performs:

* Type checking
* Route compilation
* Bundle generation
* Build validation

Once successful, the application is ready for deployment on platforms such as Vercel.

---

# 📈 Roadmap

### Current

* Inbox Bucket
* Today's Focus
* Backlog Stream
* Daily Reset Engine
* Gemini AI Task Breakdown
* Stripe Billing
* Clerk Authentication

### Planned

* AI Priority Suggestions
* Weekly Execution Reports
* Productivity Insights Dashboard
* Advanced Focus Analytics
* Team Workspaces
* Mobile App

---

# 🧠 Built For

* Students
* Developers
* Founders
* Creators
* Knowledge Workers

Anyone who wants:

**Less organization. More execution.**

---

