# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com) and this
project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]

### Added

- GitHub Actions CI pipeline (lint, typecheck, build)
- Backend `/api/health` endpoint with database connectivity check

## [0.1.0] - 2026-08-30

### Added

- Mobile-first storefront with live catalog (Next.js 16, App Router)
- Product detail pages with related items
- Public order form with product selector and quantity
- Wishlist (localStorage)
- Public order lookup — "Track Your Order"
- Admin authentication (JWT + bcrypt)
- Furniture CRUD, order management, and order notifications
- Responsive admin dashboard with mobile drawer navigation
- Supabase PostgreSQL via Prisma 7 driver adapter