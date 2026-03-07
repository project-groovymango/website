## Overview

A multi-step approval workflow for GetAccept quotes that runs entirely in Slack. Sales managers or legal teams can review, approve, or reject quotes without leaving Slack.

## What's included

- GetAccept quote creation trigger
- Slack approval message with quote details
- Multi-step approval chain (e.g., manager → legal)
- Approve/reject buttons with reason field
- GetAccept status update on approval
- Audit trail in HubSpot

## How it works

1. A rep creates a quote in GetAccept
2. Slack sends an approval request to the first approver
3. The approver clicks Approve or Reject
4. If approved, it moves to the next approver in the chain
5. Once fully approved, GetAccept is updated and the quote can be sent
6. If rejected, the rep is notified with the reason

## Screenshots

<!-- Add screenshots here -->

## Requirements

- GetAccept account
- Slack workspace
- n8n or Make account
