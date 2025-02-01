# RelationAI

Predict properties of binary relations in mathematics using convolutional neural networks.

![RelationAI](https://github.com/user-attachments/assets/f1fa20b0-3417-45d1-b5e9-110ef9a14345)

## Live Demo

Try it here: [https://relationai.netlify.app](https://relationai.netlify.app)

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Python
- Numpy
- Tensorflow

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
All of the models are close to being 100% accurate. They are all convolutional neural networks with a single neuron in the last layer, activated with sigmoid to get a binary classifier.<br>
The following code is the structure for all of these 9 models:

```py
model = Sequential()

model.add(Input(shape=(5, 5, 1)))

model.add(Conv2D(32, (3, 3), activation=None, padding="same"))
model.add(BatchNormalization())
model.add(Activation('relu'))

model.add(Conv2D(64, (3, 3), activation=None, padding="same"))
model.add(BatchNormalization())
model.add(Activation('relu'))

model.add(Flatten())

model.add(Dense(128, activation="relu"))
model.add(Dropout(0.3))

model.add(Dense(64, activation="relu"))
model.add(Dropout(0.3))

model.add(Dense(1, activation="sigmoid"))

model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
```

Apart from those 9 property-prediction models, there are 2 models which predict some kind of new relation.<br>
One of them predicts the inverse of the given relation, while the other predicts the square of the given relation (composed with itself).<br>
These 2 models are also very close to being 100% accurate. They also use convolutional neural networks, but with 25 neurons in the last layer, all activated with sigmoid, to predict each cell in the relation matrix separately.<br>
The following code is the structure for these 2 models:

```py
model = Sequential()

model.add(Input(shape=(5, 5, 1)))

model.add(Conv2D(32, (3, 3), activation=None, padding="same"))
model.add(BatchNormalization())
model.add(Activation('relu'))

model.add(Conv2D(64, (3, 3), activation=None, padding="same"))
model.add(BatchNormalization())
model.add(Activation('relu'))

model.add(Flatten())

model.add(Dense(128, activation="relu"))
model.add(Dropout(0.3))

model.add(Dense(64, activation="relu"))
model.add(Dropout(0.3))

model.add(Dense(25, activation="sigmoid"))

model.compile(optimizer="adam", loss="binary_crossentropy")
```

All of the models mentioned above were trained each on its own custom dataset of **120,000** different relations. Each was validated on **40,000** relations, and tested on **40,000** never-before-seen relations.<br>
Each model was trained on **10** epochs and with a batch size of **32**.<br>
In total, more than **2 million** different relations were used during training, validation and testing.

## Instructions

- Clone this repository.
  ```bash
  git clone https://github.com/arielkeren/relationai.git
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
