# Doctor Who Episode Database
SQL database of Doctor Who episodes and related data. Currently used by the [Catalogopolis API](https://github.com/daveross/catalogopolis-api).

## License
Public domain. *Collections of facts* can't be copywritten.

## Tables

### doctors
* **id**
* **incarnation**
* **actor**

### serials
* **id**
* **season_id**
* **story**
* **serial**
* **title**
* **production_code**

### seasons
* **id**
* **name**

### directors
* **id**
* **name**

### writers
* **id**
* **name**

### serials_doctors
* **serial_id**
* **doctor_id**

### serials_directors
* **serial_id**
* **director_id**

### serials_writers
* **serial_id**
* **writer_id**

