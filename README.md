
## Overview

**DISCLAIMER: THIS IS SAMPLE CODE AND NOT PRODUCTION QUALITY CODE!**

This sample contains an Arrow application that manages book objects and uses
the Mongo connector to make database API calls to MonogoHQ, which
acts as a backend service to manage the data.

Use this sample with the [BookClient](https://github.com/appcelerator-developer-relations/BookClient)
sample for a demonstration of a client-server project.

To use this sample, clone this repo, then either import it into Studio or
run `appc` commands from the cloned directory.

This sample was tested against Appcelerator CLI 4.0 and Appcelerator Studio 4.0.

## Import the Sample to Studio

To import this project into Studio:

  1. From the menu bar, select **File > Import**. The **Import** wizard appears.
  2. Select **General > Existing Folder as New Project**. Click **Next**.
  3. Click **Browse** and navigate to the cloned repo.
  4. Make sure Arrow is selected as the primary project type.
  5. Click **Finish**.

Studio creates a new project.

## Configuring the Arrow Application

Before running BookService, you need to setup the MongoHQ backend:

  1. Go to http://www.mongohq.com and create an account.
  2. Select to create a free database.
  3. Create a collection called `book`.

After the MongoHQ backend is setup, open the `conf/default.js` file and edit the following keys:

  1. Modify the `connectors['appc.mongo'].url` variable to point
     to your Mongo URI.  You can find the Mongo URI in the Admin console of your
     database.  It looks similar to:
     `mongodb://foobar:foobar@dharma.mongohq.com:<port_number>/<db_name>`
     Be sure to add the collection name to the end of the URI.
  2. To access the Arrow admin console, add your Appcelerator Platform login to the
     `admin.validEmails` array.

## Run the Arrow Application

### Using Studio

In Studio,

  1. Select your project in the **Project Explorer** view.
  2. In the **Launch Mode** drop-down, select **Run**, then click the **Launch** button.

Once the service starts, the local port number assigned to the service is
displayed in the **Console** view.  Studio will launch the admin console in a new view.


### Using the CLI

From the terminal, go to the cloned repo and run the following command:

    appc run

Your service can be accessed using http://localhost:8080.

## Test the Arrow Application

To test the Arrow Application, open the Arrow admin console, click the API Docs tab, then
copy-and-paste the cURL commands in a terminal.

**Example:**

  1. Navigate to the admin console.  The URL will be in the console output.
     Studio will automatically open the admin console in a new view.
  2. Click the **API Docs** tab.
  3. Click **APIs** in the left navigation bar. The admin console presents a list of all API endpoints that
     your application exposes.
  4. Click **book** in the left navigation bar. The admin console presents all the API endpoints that
     can be used to access the book model.
  5. In the `GET api/book/` method, click the **CURL** label to see the curl example.
  6. Copy the curl command and paste it in a new terminal command window.

The command will output the response from the MongoHQ service.

## Publish the Arrow Application

### Using Studio

To publish BookService to the cloud:

  1. Select your project in the **Project Explorer** view.
  2. Change the Launch mode to **Publish**, then click the **Launch** button.
  3. Once your application is deployed, a dialog appears providing you
     information about the endpoint URL for the application.

By default, the service URL will be
`http://<app_id>.cloudapp-enterprise.appcelerator.com`, where `<app_id>` is the
generated ID for your application. It may take a few minutes for the
service to be available.

To retrieve the service URL later, right-click the project folder
and select **Arrow > View Arrow Service**, which opens the service in your default web browser.

### Using the CLI

From the terminal, go to the cloned repo and run the following command:

    appc publish

To retrieve the service URL later, run the following command:

    appc cloud list BookService
