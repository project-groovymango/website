## Overview

React to any Slack message with a specific emoji to instantly create a ClickUp ticket. Includes two-way sync of comments and status updates between both platforms.

## What's included

- Slack emoji reaction trigger
- ClickUp task creation with context from the message
- Two-way comment sync (Slack thread ↔ ClickUp comments)
- Status update sync (ClickUp status → Slack thread notification)
- Duplicate detection

## How it works

1. Someone reacts to a Slack message with the designated emoji
2. A ClickUp task is created with the message content and a link back
3. Any replies in the Slack thread are synced as ClickUp comments
4. When the ClickUp task status changes, the Slack thread is updated
5. If a task already exists for that message, it won't create a duplicate

## Screenshots

<!-- Add screenshots here -->

## Requirements

- Slack workspace
- ClickUp workspace
- n8n or Make account
