# Deployment

- Signup on Aws
- Launch instance
- chmod 400 devcatchup-secret.pem
- ssh -i "devcatchup-secret.pem" ubuntu@ec2-16-171-193-72.eu-north-1.compute.amazonaws.com
- node version should be same
- git clone the github projects
- Frontend
    - go to project folder then npm install and then npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance 

- Backend
    - go to project folder then do npm install
    - add network access for the mongodb
    - enable port :4000 of your instance  in ec2 instance pulic ip
    - install pm2 package with the command => npm install pm2 -g 
    - pm2 start npm -- start 
    - pm2 logs
    - pm2 flush npm
    - pm2 stop npm
    - pm2 delete npm
    - pm2 list
    - pm2 start npm --name "devtinder-backend" -- start

    - path for nginx
    - config nginx - sudo nano /etc/nginx/sites-available/default

 
    - add the server name
    - nginx config

          location /api/ {
        proxy_pass http://localhost:4000/;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    } 

    - restart the nginx
    - sudo systemctl restart nginx
    - modify the frontend base url to api



  frontend => http://16.171.193.72/
  Backend => http://16.171.193.72/4000 => http://16.171.193.72/api  



# Adding a custom domain name

- purchased domain name from godaddy
- signup on cloudfare & add a new domain 
- change the nameservers on godaddy and point to a cloudflare
- wait for sometime till your nameservers are updated.
- DNS record: A devtinder.in 43.204.96.49
- Enable SSL for website

# EMail sending via AWS
 
- create iam user in aws console
- and then amazon simple email service(SES)
- Amazon SES: Create an Identity
- Verify your domain name
- Verfiy an email address
- Install AWS SDK - v3
- Code Example
- Setup SesClient
- Access Credentials should be created in Iam


# create .env file in server nginx

- sudo nano .env


# Scheduling cron jobs in NodeJS
- Installing node-cron
- Learning about cron expressions syntax - crontab.guru
- Schedule a job
- date-fns
- Find all the unique email Id who have got connection Request in previous day
- Send Email
- Explore queue mechanism to send bulk emails
- Amazon SES Bulk Emails
- Make sendEmail function dynamic
- bee-queue & bull npm packages


# Razorpay Payment Gateway Integration

- Sign up on Razorpay & complete KYC
- Created a UI for premiun page
- Creating an API for create order in backend
- added my key and secret in env file
- Intialized Razorpay in utils
- creating order on Razorpay
- saved the order in payments collection
- make the API dynamic
- setup Razorpay webhook on your live api



# Real Time Chat using websocket(Socket.io)
- If I', not friend, then I should not able to send message. => done
- auth in web sockets => done
- Show Green signal when online - last seen also => done 
- limit messages when fetching from DB and build pagination like thing


# Project Ideas
- Chess board
- Type Racer
- Tic Tac Toe