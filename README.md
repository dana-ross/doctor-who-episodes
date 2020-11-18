# Doctor Who Episode Database
SQL database of Doctor Who episodes and related data. Currently used by the [Catalogopolis API](https://github.com/daveross/catalogopolis-api).

## License
Public domain. *Collections of facts* can't be copywritten. But since licensing may be an issue for some people attempting to use this data, I've made it available under CC0.

<p xmlns:dct="http://purl.org/dc/terms/" xmlns:vcard="http://www.w3.org/2001/vcard-rdf/3.0#">
  <a rel="license"
     href="http://creativecommons.org/publicdomain/zero/1.0/">
    <img src="http://i.creativecommons.org/p/zero/1.0/88x31.png" style="border-style: none;" alt="CC0" />
  </a>
  <br />
  To the extent possible under law,
  <a rel="dct:publisher"
     href="https://github.com/dana-ross/doctor-who-episodes">
    <span property="dct:title">Dana Ross</span></a>
  has waived all copyright and related or neighboring rights to
  <span property="dct:title">Doctor Who Episode Database</span>.
This work is published from:
<span property="vcard:Country" datatype="dct:ISO3166"
      content="US" about="https://github.com/dana-ross/doctor-who-episodes">
  United States</span>.
</p>

## Tables

### actors
* **id** : a sequentially assigned database ID
* **uuid** : a unique ID to identify records outside the database
* **name**
* **gender**

### doctors
* **id**
* **incarnation**
* **primary_actor**

### serials
* **id**
* **season_id**
* **story**
* **serial**
* **title**
* **production_code**

### episodes
* **id**
* **title**
* **serial_id**
* **story**
* **episode_order**
* **original_air_date**
* **runtime**
* **uk_viewers_mm**
* **appreciation_index**
* **missing**
* **recreated**

### seasons
* **id**
* **name**

### companions
* **id**
* **name**
* **actor**

### directors
* **id**
* **name**

### writers
* **id**
* **name**

### serials_doctors
* **serial_id**
* **doctor_id**

### serials_companions
* **serial_id**
* **companion_id**

### serials_directors
* **serial_id**
* **director_id**

### serials_writers
* **serial_id**
* **writer_id**

## UUIDs
Use this tool to generate decimal UUIDs when creating or updating records: https://onlinerandomtools.com/generate-random-uuid?chain=remove-string-punctuation%2Cconvert-hex-to-decimal&count=100
