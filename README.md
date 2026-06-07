# PharmaOps Insight

PharmaOps Insight is a full-stack pharmaceutical operations monitoring and analytics platform developed during an internship at Emil Pharmaceutical Industries Pvt. Ltd.

The system centralizes workflow tracking, production monitoring, department management, IT ticket management, and operational analytics into a single web-based application.

---

## Features

### User Authentication

* Secure Login and Registration
* BCrypt Password Hashing
* JWT-based Authentication
* Role-Based Access Control

### Workflow Tracking

* Create, Update, and Delete Workflow Records
* Batch Tracking
* Workflow Status Monitoring
* Delayed Workflow Alerts

### Department Management

* Department Information Management
* Employee Count Tracking
* Department Status Monitoring

### Production Monitoring

* Production Batch Tracking
* Planned vs Produced Quantity Monitoring
* Production Trend Analysis

### IT Ticket Management

* Ticket Creation and Tracking
* Priority-Based Ticket Handling
* Status Monitoring

### Dashboard Analytics

* KPI Cards
* Workflow Status Pie Chart
* Department Workload Bar Chart
* Production Trend Line Chart
* Delayed Workflow Alerts

---

## Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Recharts
* Axios

### Backend

* Flask
* Python
* JWT Authentication
* BCrypt

### Database

* Microsoft SQL Server
* PyODBC

### Development Tools

* Postman
* Git
* GitHub

---

## Database Tables

The application uses the following database tables:

1. Users
2. Departments
3. Workflow_Tracking
4. Production
5. IT_Tickets

---

## System Architecture

Users → React Frontend → Flask REST APIs → SQL Server Database

The frontend communicates with Flask APIs using Axios. The backend processes requests and stores operational data in Microsoft SQL Server.

---

## Project Modules

* Authentication Module
* Dashboard Analytics Module
* Workflow Tracking Module
* Production Monitoring Module
* Department Management Module
* IT Ticket Management Module

---

## Key Outcomes

* Centralized operational monitoring
* Improved workflow visibility
* Production trend analysis
* IT support ticket management
* Interactive business intelligence dashboard
* Real-time workflow analytics

---

## Future Enhancements

* Cloud Deployment
* ERP Integration
* Mobile Application
* Automated Report Generation
* Real-Time Notifications
* Predictive Analytics

---

## Developed By

Atharva Mogre

B.E. Computer Science & Engineering (Data Science)

Internship Project – Emil Pharmaceutical Industries Pvt. Ltd.
