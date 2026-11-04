# DailyPulse – Current Affairs Website

A responsive, static current-affairs and news portal built with HTML, CSS and vanilla JavaScript.

## Features
- Responsive desktop and mobile layout
- Breaking-news style briefing strip
- News cards with category filters
- Search headlines, summaries and categories
- Article reading modal
- Newsletter demo form (does not collect or send data)
- No framework, database, paid API or build step required

## Project structure
```text
DailyPulse/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Run locally
Open `index.html` in a browser. For a local web server, run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Deploy on Ubuntu EC2 with Nginx
Install Nginx:
```bash
sudo apt update
sudo apt install nginx -y
```
Copy the contents of this repository into `/var/www/html/` and ensure the EC2 security group allows inbound HTTP on port 80 from the intended source.

## GitHub Actions deployment
This repository is static, so deployment can copy the site files to an EC2 instance over SSH. Add GitHub repository secrets:
- `EC2_HOST`: EC2 public IP or DNS
- `EC2_USER`: usually `ubuntu`
- `EC2_SSH_KEY`: private SSH key content for the deployment user

Create `.github/workflows/deploy.yml` with your deployment workflow after the EC2 web server is configured. Do not commit private keys or credentials.

## Content notice
The included stories are educational demo explainers, not live news reports or verified current-affairs updates. Replace them with verified reporting and cite trustworthy sources before publishing real news. The newsletter form is UI-only and does not store or transmit email addresses.
