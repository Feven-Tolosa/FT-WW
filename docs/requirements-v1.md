✅ PROJECT REQUIREMENTS (VERSION 1 – AGILE MVP)
Roles

🔐 Admin (Restricted)

Admins:
Father: dawit
Partner: beriso

Only admins can:
-Log in
-Access admin dashboard
-Manage furniture
-View client orders & notifications

👥 Client (Public)
-No account required
-Can browse furniture
-Can place an order by entering:
-Full name
-Phone number
-Can call admins directly

🪑 Furniture Management (Admin Only)
Admins can:
✅ Add new furniture
✅ Set price
✅ Edit furniture details
✅ Delete furniture
✅ Upload image (later, optional)

Furniture fields:

    -Name
    -Description
    -Price
    -Category (table, chair, bed, etc.)
    -Availability
    -Created date
    -Updated date

🛒 Ordering Flow (Client Side)

        -Client visits website (no login)
        -Sees all furniture posted by admin
        -Clicks Order
        -Enters:
              -Full name
              -Phone number
              -Submits order
        -Admin receives notification

🔔 Notifications & Admin Dashboard

Admins can:
-See new order notifications
-Selected furniture
-Order date
-Manage orders from dashboard
-View:
Client name
Phone number

🔒 Security Requirements

Admin pages must be protected

Only admins can:
-Access /admin
-Manage furniture
-View orders
-Clients cannot access admin APIs

Tech:
-JWT / session auth
-Role-based access control

Later (future sprint):
-Order status
-Payments
-Client login
