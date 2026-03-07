## Overview

A fully automated round-robin lead assignment system that distributes incoming leads based on region and company size. Built with a control panel directly inside HubSpot using a custom object.

## What's included

- Custom HubSpot object for managing assignment rules
- Region-based routing logic with fallback assignments
- Company size segmentation (SMB, Mid-Market, Enterprise)
- Pause/resume functionality per rep
- Weighted distribution support
- Slack notifications on assignment

## How it works

1. A new lead comes into HubSpot (via form, import, or API)
2. The automation reads the lead's region and company size
3. It checks the control panel to find eligible reps
4. The lead is assigned based on round-robin logic with weighting
5. The assigned rep gets a Slack notification

## Screenshots

<!-- Add screenshots here -->
<!-- ![Control Panel](/path/to/screenshot.png) -->

## Requirements

- HubSpot Professional or Enterprise
- Make or n8n account
- Slack workspace
