FORMAT: 1A
HOST: http://api.yourserver.com

# <%= appName %> API

<% _.forEach( apiMembers, function( member ) {  %>

# <%= _.capitalize( member.pluralName ) %>
<%= _.capitalize( member.singularName ) %> related resources of the **<%= _.capitalize( appName ) %> API**

## <%= _.capitalize( member.pluralName ) %> Collection [/<%= member.pluralName %>]
### List all <%= _.capitalize( member.pluralName ) %> [GET]
+ Response 200 (application/json)

        {
            "entities": [{
                "id": 1,
                "name": "example"
                }, {
                "id": 2,
                "name": "example as well"
            }]
        }

### Create an <%= _.capitalize( member.singularName ) %> [POST]
+ Request (application/json)

        {
            "name": "example"
        }

+ Response 201 (application/json)

        {
            "id": 1,
            "name": "example"
        }

## <%= _.capitalize( member.singularName ) %> [/<%= member.pluralName %>/{<%= member.singularName %>Id}]
A single <%= _.capitalize( member.singularName ) %> object with all its details

+ Parameters
    + {<%= member.singularName %>Id} (required, number, `1`) ... Numeric `id` of the <%= _.capitalize( member.singularName ) %> to perform action with. Has example value.

### Retrieve an <%= _.capitalize( member.singularName ) %> [GET]
+ Response 200 (application/json)

    + Body

            {
                "id": 2,
                "name": "example"
            }

### Remove an <%= _.capitalize( member.singularName ) %> [DELETE]
+ Response 204

<% }) %>
