🪑 Furniture Management Platform
##Project Overview

A full-stack web application built to help a small furniture business manage products and customer orders digitally. 
Admins can post furniture and receive order notifications, while clients can browse furniture and place orders without signing in.
The project is developed using an Agile approach, starting with a simple MVP and expanding over time.

##Problem Statement

Small furniture businesses often manage orders manually, which leads to poor tracking and repeated client questions. 
This platform provides a centralized and simple solution to improve both business workflow and customer experience.

##Tech Stack

Frontend: Next.js, TypeScript, Tailwind CSS
Backend: Node.js, Express, TypeScript
Databases: PostgreSQL, MongoDB
Tools: Prisma, JWT, Git

Features:
##Admin (Secure)

Admin authentication
Add, edit, delete furniture
Set prices
View client orders
Receive order notifications

##Client (Public)

Browse furniture without signing in
Place orders using name and phone number
Contact admins directly

##Architecture

Next.js (Frontend)
      |
REST API
      |
Node.js + Express
      |
PostgreSQL | MongoDB

*PostgreSQL: core business data
*MongoDB: notifications and logs

Status

🚧 Work in progress — MVP foundation completed.
