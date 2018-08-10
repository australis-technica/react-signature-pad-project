Simple react signature pad 
purpose: send canvas/drawing/signature to sql-server varbinary(max) column;

building:

    yarn 
    npm run build
    npm test

Run it:

    npm run serve # from root project
    npm run start # from root project

but before ....

create a .secrets/ directory on project root
and place a file named:
    
     db-connection.config.json

with the following schema: (see tedious/Connection)

    {
        "server": "localhost",
        "userName": "sqluser",
        "password": "sqlpassword",
        "port": 1433,
        "options": {
            "encrypt": false, // optional
            // db must exists!
            "database": "react_signature_pad_demo" // any db_name you like
        }
    }

ui:  
packages/signature-pad-demo  (React/ui)  

serve:  
packages/signature-pad-demo-backend  (Node/Express)  



