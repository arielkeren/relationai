# RelationAI

Predict properties and apply operations on mathematical binary relations using AI.

![RelationAI](https://github.com/user-attachments/assets/f1fa20b0-3417-45d1-b5e9-110ef9a14345)

## Live Demo

Try it here: [https://relationai.netlify.app](https://relationai.netlify.app)

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Python
- NumPy
- TensorFlow
- Keras

## Background

This project was made as the final project for 5 units of software engineering in high school.

## Features

### Relation Buttons

Every cell in the 5-by-5 matrix, representing the binary relation, can be clicked and toggled on or off.<br>
In addition, there are several buttons below the relation matrix:

- `Empty Relation` - Toggles off all of the cells in the relation matrix.
- `Inverse Relation` - Changes the current relation to its inverse, using a convolutional neural network.
- `Identity Relation` - Changes the relation matrix, such that the only toggled cells are of the main diagonal.
- `Squared Relation` - Changes the current relation to its square (composed with itself), using a convolutional neural network.
- `Universal Relation` - Toggles on all of the cells in the relation matrix.
- `Random Relation` - Randomizes the relation matrix.

### Properties

Each of the 9 properties displays the confidence of the model on it being satisfied with a percentage value, along with an animated bar.<br>
Additionally, each property can be clicked, in order to force the current relation to satisfy it. Essentially, an algorithm searches for the closest relation that satisfies the forced property.
The list of all 9 properties:

- `Reflexivity` - $∀x ∈ A, (x, x) ∈ R$
- `Irreflexivity` - $∀x ∈ A, (x, x) ∉ R$
- `Symmetry` - $∀x,y ∈ A, (x, y) ∈ R => (y, x) ∈ R$
- `Asymmetry` - $∀x,y ∈ A, (x, y) ∈ R => (y, x) ∉ R$
- `Antisymmetry` - $∀x,y ∈ A, (x, y) ∈ R ∧ (y, x) ∈ R => x = y$
- `Transitivity` - $∀x,y,z ∈ A, (x, y) ∈ R ∧ (y, z) ∈ R => (x, z) ∈ R$
- `Antitransitivity` - $∀x,y,z ∈ A, (x, y) ∈ R ∧ (y, z) ∈ R => (x, z) ∉ R$
- `Totality` - $∀x,y ∈ A, (x, y) ∈ R ∨ (y, x) ∈ R$
- `Trichotomy` - $∀x,y ∈ A, x = y ∨ (x, y) ∈ R ∨ (y, x) ∈ R$

### Categories

If a relation satisfies some combination of properties, a category could be satisfied.<br>
Additionally, each category can be clicked, in order to force the current relation to satisfy it, thereby satisfying every single required property. Essentially, an algorithm searches for the closest relation that satisfies the forced category.
The list of all 5 properties:

- `Equivalence Relation` - Satisfies _reflexivity_, _symmetry_ and _transitivity_.
- `Partial Order` - Satisfies _reflexivity_, _antisymmetry_ and _transitivity_.
- `Total Order` - Satisfies _reflexivity_, _antisymmetry_, _transitivity_ and _totality_.
- `Strict Partial Order` - Satisfies _irreflexivity_ and _transitivity_.
- `Strict Total Order` - Satisfies _irreflexivity_, _transitivity_ and _trichotomy_.

## Machine Learning

9 different models were trained to recognize patterns in 5-by-5 binary relations, in order to determine if some property is satisfied.<br>
All of the models are close to being 100% accurate. They are all feedforward models with a sigmoid layer in the end, consisting of a single neuron, to get a binary classifier.<br>
The following code is the structure of all 9 models in Keras:

```py
model = Sequential()

model.add(Input(shape=(25,)))

model.add(Dense(32, activation="relu"))
model.add(Dense(1, activation="sigmoid"))

model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
```

Apart from those 9 property-prediction models, there are 2 models which predict some kind of new relation.<br>
One of them predicts the inverse of the given relation, while the other predicts the square of the given relation (composed with itself).<br>
The inversion model is very similar to the previous 9 models, but with 25 neurons in the last layer, instead of only 1, to predict each of the 25 cells in the new relation matrix.<br>
It is close to 100% accurate.<br>
The following code is the structure of the inversion model in Keras:

```py
model = Sequential()

model.add(Input(shape=(25,)))

model.add(Dense(32, activation="relu"))
model.add(Dense(25, activation="sigmoid"))

model.compile(optimizer="adam", loss="binary_crossentropy")
```

The final model is the composition model. This model is also very similar to the inversion model, but with 128 neurons in the hidden layer, instead of the usual 32 neurons (composition is much more complicated than inversion).<br>
It is also close to 100% accurate.<br>
The following code is the structure of the composition model in Keras:

```py
model = Sequential()

model.add(Input(shape=(25,)))

model.add(Dense(128, activation="relu"))
model.add(Dense(25, activation="sigmoid"))

model.compile(optimizer="adam", loss="binary_crossentropy")
```

Every property and operation has been given its own custom dataset of **1,000,000** different relations.<br>
The datasets were each split to 60% training (600,000), 20% validation (200,000) and 20% testing (200,000).<br>
Each model was trained for **10** epochs, with a batch size of **32**.<br>
In total, more than **11 million** different relations were used during training, validation and testing.

## Instructions

- Clone this repository.
  ```bash
  git clone https://github.com/arielkeren/relationai.git
  ```
- Navigate to the "frontend" directory.
  ```bash
  cd relationai/frontend
  ```
- Install the required Node modules.
  ```bash
  npm install
  # or
  yarn install
  # or
  pnpm install
  ```
- Run the development server.
  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  ```
- Open [http://localhost:3000](http://localhost:3000) on your browser.
