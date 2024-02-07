from flask import Flask, request
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import OneHotEncoder
import pandas as pd
import pickle

app = Flask(__name__)

model = None

unit_types = ['unknown', 'at-st', 'stormtrooper', 'x-wing', 'tie_silencer', 'tie_fighter', 
        'at-at', 'resistance_soldier']

homeworlds = ['Champala', 'Tund', 'Mirial', 'Haruun Kal', 'Stewjon', 'Toydaria',
       'Naboo', 'Troiken', 'Dathomir', 'Iktotch', 'Concord Dawn', 'Dorin',
       'Dagobah', 'Cerea', 'Rodia', 'Serenno', 'Kashyyyk', 'Corellia',
       'Tholoth', 'Iridonia', 'Glee Anselm', 'Bestine IV', 'Ojom',
       'Socorro', 'Ryloth', 'Malastare', 'Quermia', 'Mon Cala',
       'Chandrila', 'Skako', 'Alderaan', 'Umbara', 'Aleen Minor',
       'Tatooine', 'Muunilinst', 'Zolan', 'Trandosha', 'Sullust', 'Shili',
       'Kalee', 'Eriadu', 'Vulpter']

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    return "Hello world"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    homeworld = data["homeworld"]
    unit_type = data["unit_type"]

    df = pd.DataFrame()
    df["unit_type"] = pd.Categorical({unit_type}, categories=unit_types)
    df["homeworld"] = pd.Categorical({homeworld}, categories=homeworlds)
    df = pd.get_dummies(df)
    df = df[model.feature_names_in_]

    is_resistance = model.predict(df)[0]

    if is_resistance:
        return "Resistance"
    else:
        return "Empire"

if __name__ == "__main__":
    model = pickle.load(open('trained_model.pkl', 'rb'))
    app.run(port=5000, debug=True)

