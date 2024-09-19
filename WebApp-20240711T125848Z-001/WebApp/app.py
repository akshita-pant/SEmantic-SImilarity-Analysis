from flask import Flask, request, jsonify, render_template
import fasttext
import numpy as np

app = Flask(__name__, static_folder='static')


skipgram1Model100 = fasttext.load_model("skipgram_model1.bin")
skipgram2Model100 = fasttext.load_model("skipgram_model10.bin")
skipgram3Model100 = fasttext.load_model("skipgram_model100.bin")
skipgram4Model100 = fasttext.load_model("skipgram_model1000.bin")
skipgram5Model100 = fasttext.load_model("skipgram_model10000.bin")

cbow1Model100 = fasttext.load_model("cbow_model1.bin")
cbow2Model100 = fasttext.load_model("cbow_model10.bin")
cbow3Model100 = fasttext.load_model("cbow_model100.bin")
cbow4Model100 = fasttext.load_model("cbow_model1000.bin")
cbow5Model100 = fasttext.load_model("cbow_model10000.bin")

#Homepage Route
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

#skipgram-similarity route
@app.route("/skipgram-similarity100", methods=["POST"])
def calculate_skipgram100_similarity():
    try:
        # Extract data from request
        sentence1 = request.form["sentence1"]
        sentence2 = request.form["sentence2"]
        model = int(request.form["model"])

        # Choose appropriate model based on user selection
        if model == 1:
            vector1 = skipgram1Model100.get_sentence_vector(sentence1)
            vector2 = skipgram1Model100.get_sentence_vector(sentence2)
        elif model == 2:
            vector1 = skipgram2Model100.get_sentence_vector(sentence1)
            vector2 = skipgram2Model100.get_sentence_vector(sentence2)
        elif model == 3:
            vector1 = skipgram3Model100.get_sentence_vector(sentence1)
            vector2 = skipgram3Model100.get_sentence_vector(sentence2)
        elif model == 4:
            vector1 = skipgram4Model100.get_sentence_vector(sentence1)
            vector2 = skipgram4Model100.get_sentence_vector(sentence2)
        elif model == 5:
            vector1 = skipgram5Model100.get_sentence_vector(sentence1)
            vector2 = skipgram5Model100.get_sentence_vector(sentence2)
        else:
            return jsonify({"similarity": "Invalid model selection"}), 400

        # Calculate similarity using cosine similarity
        similarity = np.dot(vector1, vector2) / (np.linalg.norm(vector1) * np.linalg.norm(vector2))
        similarity = float(similarity)

        return jsonify({"similarity": similarity})

    except (KeyError, ValueError) as e:
        # Handle missing or invalid request data
        return jsonify({"error": str(e)}), 400
#cbow-similarity route
@app.route("/cbow-similarity100", methods=["POST"])
def calculate_cbow100_similarity():
    try:
        # Extract data from request
        sentence1 = request.form["sentence1"]
        sentence2 = request.form["sentence2"]
        model = int(request.form["model"])

        # Choose appropriate model based on user selection
        if model == 1:
            vector1 = cbow1Model100.get_sentence_vector(sentence1)
            vector2 = cbow1Model100.get_sentence_vector(sentence2)
        elif model == 2:
            vector1 = cbow2Model100.get_sentence_vector(sentence1)
            vector2 = cbow2Model100.get_sentence_vector(sentence2)
        elif model == 3:
            vector1 = cbow3Model100.get_sentence_vector(sentence1)
            vector2 = cbow3Model100.get_sentence_vector(sentence2)
        elif model == 4:
            vector1 = cbow4Model100.get_sentence_vector(sentence1)
            vector2 = cbow4Model100.get_sentence_vector(sentence2)
        elif model == 5:
            vector1 = cbow5Model100.get_sentence_vector(sentence1)
            vector2 = cbow5Model100.get_sentence_vector(sentence2)
        else:
            return jsonify({"similarity": "Invalid model selection"}), 400

        # Calculate similarity using cosine similarity
        similarity = np.dot(vector1, vector2) / (np.linalg.norm(vector1) * np.linalg.norm(vector2))
        similarity = float(similarity)

        return jsonify({"similarity": similarity})

    except (KeyError, ValueError) as e:
        # Handle missing or invalid request data
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)