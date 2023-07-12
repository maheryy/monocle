# Monocle

Monocle is a web analytics tool that allows you to track user interactions on your website.

## Architecture

Monocle is split into multiple packages

### Server packages (Will run on your server)

`@monocle/api`: handles requests from the different clients and stores data in the database.

`@monocle/ui`: allows you to view analytics data.

### Client packages (Will depend on the platform you are using)

`@monocle/browser`: focuses on tracking interactions and collecting data that may occur in a browser.

`@monocle/node`: focuses on tracking interactions and collecting data that may occur in a node environment.
