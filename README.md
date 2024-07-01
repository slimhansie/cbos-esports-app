# Setup Instructions

After downloading the repository to your machine, you'll need to complete the following steps to run the program.
This program requires node.js and a MySQL server.

## Setup the database

1. Create a new MySQL database called `cbos_esports`.
2. Import the schema file `cb_esports.sql` into the new database.

`db_schema.png` is a visual representation of what the database should look like.

## Install the SvelteKit app.

1. Open the folder this file is in and execute `npm install`.
2. Rename `.env_dev` to `.env` and supply the file with the details of your MySQL server.
3. Execute `npm run build` to build the program.
4. Execute `npm run preview` to run the program.

## Using the program

1. Navigate to `/teams/create` and create two teams.
2. Edit and delete teams from `/teams`.
3. Navigate to `/matches/create` and create a match.
4. Edit and add rounds to matches from `matches`.
5. Navigate to `/` to view results.
