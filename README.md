# D3spacito- Sarar Aseer, Jared Asch, Cathy Cai, Michelle Tang

### Description of data set(s).

HyperLinks:
- https://infohub.nyced.org/reports-and-policies/school-quality/nyc-school-survey/survey-archives?fbclid=IwAR1A59E4T3YtsDgAhfkuwDskCXwPjolJs1jupF4UAeufSIuzatrvW85vSe8

Description:
These data sets allows the user to see a wide variety of subjects and categories regarding the schools  of New York. The website is filled with data from safety to grades.

Significance:
Due to the variety of data the user can draw conclusions at their leisure, viewing whatever peeks their interest. In addition, the website allows the user to draw conclusions between data sets that would normally not be seen together (e.g. students safety & cafe food).

### Explanation, in broad strokes if necessary, of how you aim to make this data come alive.

We will let the user pick and choose whatever district they want on a map of NYC, this way they can feel how location can affect a student, and correlations between locations. With that we will give a vast array of questions that were asked to the students, which the user will be able to see and choose. Once a question is chosen and a district is picked, we will load a pie chart that will represent the students answer.


### D3 and its role

We will use a choropleth map too NYC to display all the districts that partook in the school survey. The user will be able to click on one of the districts and highlight it, marking it for the user and informing us that they want to see information about that school. Then the user will choose a question from the list and we will generate a pie chart based on that question. For the mot part the D3 will be used to let the user draw their own conclusions based on the survey questions, answers, and location on the map.


### Roles

Sarar A: As project manager, Sarar maintains the devlog, makes sure the team works well together, maintains the design documentation, stays on top of design changes, and handles minor coding issues.

Jared A: Will work on CSS and frontend templates, if possible will join backend later

Cathy C: Will work on sending and receiving data throughout the website, & file IO/data representation.

Michelle T:  Will work on JS & D3 aspects of the website.

### Sketch
![what](https://github.com/SararAseer/D3spacito/blob/master/doc/Example.png)

### Timeline:
- 03/28 Design doc work
- 03/29 Laying out of basic templates and congregate data
- 03/30  Implementing basic plot functionality and adding css/Bootstrap
- 03/31  Creating user personal graphs from data/ adding js for isolating data by category
- 04/01-04/04   Polish templates/js
- 04/05 Polish templates/js

### Launch Instructions

1. Clone this repo
```
$ git clone https://github.com/SararAseer/D3spacito.git
```

2. Activate your virtual environment
```
$ python3 -m venv venv
$ . venv/bin/activate
```

3. Enter directory
```
$ cd D3spacito
```

4. Run app
```
$ python app.py
```

5. Open your web browser and open `localhost:5000`
   - Explore our data freely

6. Type `deactivate` to deactivate your virtual environment
