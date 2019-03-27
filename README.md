# D3spacito- Sarar Aseer, Jared Asch, Cathy Cai, Michelle Tang

### Description of data set(s).

HyperLinks:
https://catalog.data.gov/dataset?organization=city-of-new-york
https://catalog.data.gov/dataset/nyc-wi-fi-hotspot-locations-9a8e0
https://catalog.data.gov/dataset/nyc-social-media-usage-555a2

Description:
These data sets allows the user to see a wide variety of subjects and categories regarding the city of New York. The website is filled with data from social media usage to wifi hotspot locations.
	
Significance:	
Due to the variety of data the user can draw conclusions at their leisure, viewing whatever peeks their interest. In addition, the website allows the user to draw conclusions between data sets that would normally not be seen together (e.g. demographic by zip code, and popular baby names by ethnicity).

### Explanation, in broad strokes if necessary, of how you aim to make this data come alive.

To help the users focus on specific portions of the graph that is created from the data of their choosing, we will create a side panel with options to edit the graph, including multiple drop down menus for customizing the graph’s units, axis, formula, as well as allowing options to add a new data series to the same graph. These filters can also help users zone in on specific details that peaked their interest on different graphs to draw their own conclusions. For example, zoning the data from New York specifically to Queens and seeing correlations between different data sets.

Example: https://fred.stlouisfed.org/series/GDPC1#0
If you click edit, you can change the graph axis and units, customize the formula, add a new data series to the same graph, and change the graph format.

### D3 and its role

We will create a graph based on the users choice of data. The graph will be chosen based on how optimal it is for the data set. According, to the data set there will be a filter that the user may put on it, for instance, lowering the scope from New York to a specific borough.Furthermore, we will have an interactive bar graph. We will allow the user to choose their own size and color scheme, include the size of the bar and the scale. If they do not provide one, appropriate scaling will be used by manipulating the min and max of a given data set. We will also include animations that feature changes from one social media platform to another. This will maintain a user’s interest and help highlight important parts of the graph. 

### Roles

Sarar A: As project manager, Sarar maintains the devlog, makes sure the team works well together, maintains the design documentation, stays on top of design changes, and handles minor coding issues.

Jared A: Will work on CSS and frontend templates, if possible will join backend later

Cathy C: Will work on sending and receiving data throughout the website, & file IO/data representation.

Michelle T:  Will work on JS & D3 aspects of the website.

### Timeline:
03/28 Design doc work
03/29 Laying out of basic templates and congregate data
03/30  Implementing basic plot functionality and adding css/Bootstrap
03/31  Creating user personal graphs from data/ adding js for isolating data by category
04/01-04/04   Polish templates/js
04/05 Polish templates/js



