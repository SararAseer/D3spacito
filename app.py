

import os
import json


from flask import Flask, request, render_template, session, url_for, redirect, flash

# instantiate flask app
app = Flask(__name__)

# root route
@app.route("/")
def home():
    return render_template("index.html")


# run flask app with debug set to true
if __name__ == "__main__":
    app.run(debug = True)
