FORMAT: 1A
HOST: http://api.yourserver.com

# Example Rest API

# Group Example
Example related resources of the **Example API**

## Examples Collection [/examples]
### List all Examples [GET]
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

### Create an Example [POST]
+ Request (application/json)

        {
            "name": "example"
        }

+ Response 201 (application/json)

        {
            "id": 1,
            "name": "example"
        }

## Example [/examples/{exampleId}]
A single Example object with all its details

+ Parameters
    + exampleId (required, number, `1`) ... Numeric `id` of the Example to perform action with. Has example value.

### Retrieve an Example [GET]
+ Response 200 (application/json)

    + Body

            {
                "id": 2,
                "name": "example"
            }

### Remove an Example [DELETE]
+ Response 204
