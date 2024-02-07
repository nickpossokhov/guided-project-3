from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import OneHotEncoder
import pandas as pd
import pickle

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
@cross_origin()
def predict():
    data = request.get_json()
    homeworld = data["homeworld"]
    unit_type = data["unit_type"]

    df = pd.DataFrame()
    df["unit_type"] = pd.Categorical({unit_type}, categories=unit_types)
    df["homeworld"] = pd.Categorical({homeworld}, categories=homeworlds)
    df = pd.get_dummies(df)
    df = df[feature_names]

    is_resistance = model.predict(df)[0]

    res = {
        "is_resistance": str(is_resistance),
        "accuracy_score": 0.625,
        "feature_importances": feature_importances
    }

    return jsonify(res)
    
if __name__ == "__main__":
    model = pickle.load(open('trained_model.pkl', 'rb'))
    
    feature_names = model.feature_names_in_.tolist()
    importances = model.feature_importances_.tolist()
    feature_importances = {feature_names[i]: importances[i] for i in range(len(feature_names))}

    app.run(port=5000, debug=True)

