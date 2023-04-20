# Proof Of Concept - Tests Unitaires API

## Sommaire

 - [Jest](#jest)
 - [SuperTest](#supertest)
 - [POC](#poc)
 - [Tests](#tests)

## Jest

Jest est un framework de test JavaScript permettant de créer des suites de tests. 
Il peut être utilisé pour tester des applications Vanilla mais il est aussi capable de tester des applications utilisants des frameworks comme React, Vue.js, Angular, ... en utilisant des librairies.

Pour installer Jest on peut utiliser la commande :

```bash
npm install --save-dev jest
```

L'argument `--save-dev` permet de préciser que le package ne doit être installé que dans le cadre d'un environnement de développement et non en production.

Pour rendre plus facile l'execution des tests on ajoute le script suivant dans le fichier `package.json` :

```json
"test": "jest"
```

Ce script sera executé en exécutant la commande `npm run test` ou `npm test` dans le terminal.
Le script cherchera par défaut un dossier `/tests/` pour trouver les fichiers de test qui doivent être du format `*.test.js`.

On peut ajouter au script ou à l'exécution l'argument `--detectOpenHandles` afin d'être informé si un processus asynchrone empêche l'arrêt du programme de test.

Si on veut obtenir un rapport de coverage, on peut ajouter l'argument `--coverage` à l'exécution pour avoir l'indication dans le terminal à la fin des tests. On peut aussi préciser un chemin avec l'argument `--coverageDirectory` pour que Jest génère le rapport sous la forme d'une page html.

Pour créer une suite de test on utilise la fonction `describe(name, fn)` dans laquelle on va déclarer des tests avec la fonction `test(name, fn, timeout)` (on peut aussi utiliser l'alias `it`

Au sein d'un test on peut utiliser `expect` pour déclarer les résultats attendu couplé aux méthodes `toBe()`, `toEqual` ou d'autres ([cf la doc officielle](https://jestjs.io/docs/api)).
Dans le cas ou on attend un objet json d'un type spécifique sans pour autant être sûr de la valeur, on peut utiliser `expect.objectContaining()` et déclarer les champs et leur type attendu dans l'objet.

Par exemple :
```js
expect(obj).toEqual(expect.objectContaining({ id: expect.any(Number), username: expect.any(String) }))
```

## Supertest


