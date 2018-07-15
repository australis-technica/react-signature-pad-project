simple react signature pad 
purpose: send signatures to sql-server varbinary(max) column;
see packages/demo
see packages/demo-backend


Notes:

@australis/data-url-tools:  
Before publish,  set package/private=false, publish and revert changes.  
why?, to keep using yarn to manage monorepo.   
Why?, because yarn workspaces doesn't support !private packages.  
why not lerna to publish? becasue I like to use yarn.