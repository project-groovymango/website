## Overview

Automatically creates a customer and subscription in Chargebee the moment a quote is signed in GetAccept. No manual data entry, no copy-pasting between tabs.

## What's included

- GetAccept signature webhook listener
- Customer creation in Chargebee with mapped fields
- Subscription setup based on deal line items
- HubSpot deal stage update on completion
- Error handling with Slack alerts

## How it works

1. A quote is signed in GetAccept
2. The automation picks up the signature event
3. It creates or updates the customer in Chargebee
4. A subscription is created based on the deal's line items
5. The HubSpot deal is moved to "Closed Won"

## Screenshots

<!-- Add screenshots here -->

## Requirements

- HubSpot with deal pipeline configured
- Chargebee account
- Make account
