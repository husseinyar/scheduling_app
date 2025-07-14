# **App Name**: Schema

## Core Features:

- Role-Based Login: User authentication with role-based access control (Admin, Manager, Employee) using mock user data stored in `mockUsers.json`.
- Role-Specific Dashboards: Dashboard presenting different views based on the logged-in user's role. Admin sees all users/shifts, Manager manages shifts and employees, Employee views/applies for shifts.
- Shift Scheduling Calendar: Calendar interface displaying available and assigned shifts using data from `mockShifts.json`.
- Mock Chat Interface: Simulated chat interface to facilitate communication between users based on the content in `mockMessages.json`.
- Multi-Language Support: Language toggle component for switching between Swedish and English. All labels/text is sourced from `translations.json`.
- Shift assignment by role: Manage shift assignments by user role

## Style Guidelines:

- Primary color: Light sky blue (#87CEEB) for calmness and trustworthiness, in line with the aesthetics of Swedish public services.
- Background color: Very light blue (#F0F8FF), almost white, to create a clean and minimalist interface.
- Accent color: Soft orange (#FFB347) to draw attention to CTAs without overwhelming the calm aesthetic.
- Font pairing: 'Inter' (sans-serif) for both headings and body text. Note: currently only Google Fonts are supported.
- Code Font: 'Source Code Pro' for the display of code samples, or other monospaced text as necessary. Note: currently only Google Fonts are supported.
- Use clear, minimalist icons to represent actions and states.
- Employ a clean, accessible layout inspired by Swedish UX principles, prioritizing usability and clarity.