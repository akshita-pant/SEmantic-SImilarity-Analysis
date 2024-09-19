# Semantic Similarity Analysis Using FastText

## Overview

This project focuses on evaluating the semantic similarity performance of FastText models (Skipgram and CBOW) trained on a large corpus of Wikipedia articles. The project compares the training times and performance of models with different dimensions and dataset sizes, using the STS Benchmark for evaluation.

![Alt text](./gif%20folder/simulation.gif)

## Methodology

The methodology comprises several key steps:

1. **Data Collection:**  
   A publicly available dataset, "Wikipedia (20220301.en)", was chosen to provide a large corpus for training. FastText requires large amounts of text to generate accurate word embeddings.

2. **Data Preprocessing:**  
   Preprocessing steps included:

   - Field selection for Wikipedia articles
   - Text normalization (case-insensitivity)
   - Removal of special characters (except whitespaces)
   - Text trimming and normalization of whitespaces

3. **Model Training and Evaluation:**  
   Multiple FastText models, including both CBOW and Skipgram, were trained on various dataset sizes (ranging from 1 to 10,000 articles). The models were evaluated on:
   - **STS Benchmark**
   - **Pearson Correlation Coefficient (PCC)**

## Models

### **FastText**:

FastText is an efficient text classification and word representation tool. It enhances word embeddings by using sub-word information, making it robust for rare words and semantic linkages.

### **Skipgram**:

Learns word representations by predicting context words from the target word.

### **CBOW (Continuous Bag of Words)**:

Predicts the target word based on context words, focusing on the surrounding context.

## Results

- **Training Time:** Skipgram models generally require more training time than CBOW, especially for larger datasets and higher-dimensional embeddings.
- **Performance:**
  - Skipgram models typically yield higher PCC, indicating better semantic similarity.
  - The CBOW model (300-dimensional, largest dataset) achieved the highest PCC (0.47581), while the Skipgram model (100-dimensional, smallest dataset) had the lowest PCC (0.10212).

## Conclusion

- **Findings:** Skipgram models are more effective but require greater computational resources. High-dimensional embeddings and larger datasets improve performance for both Skipgram and CBOW.
- **Limitations:** Limited preprocessing techniques, reliance on a single dataset, and only one evaluation metric (STS Benchmark) were used.

## Future Work

- Incorporating additional benchmarks (e.g., sentiment analysis, named entity recognition)
- Experimenting with advanced neural network architectures like transformers
- Hyperparameter tuning and further preprocessing techniques
- Developing domain-specific and multilingual word embeddings

## Requirements

- Python 3.x
- FastText
- HuggingFace Datasets
