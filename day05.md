# Jour 5

Je vais essayer de prendre des notes sur les challenges.

En lisant l'énoncé, je trouve qu'il y a beaucoup de bruit dans l'explication.

L'idée du sujet est qu'on a une liste qui nous indique l'ordre à suivre et une liste de "mise à jour"
qui doivent être faites dans le bon ordre pour la compter comme valide.

```
75|53
29|13
97|29
53|29
```

Pour cet exemple, on obtient en ligne possible `75,53,29,13`.

Il faut à mon avis se concentrer uniquement sur ce qui doit être avant un nombre,
je me sers de l'utilitaire que j'avais récupéré pour le jour 1 `splitPairs`,
pour obtenir la colonne `before` et la colonne `after`.

Grâce à ça je crée une fonction `getBefore`, qui doit me retourner tous les numéros qui sont avant le nombre donné.

```typescript
function getBefore(number: number, before: number[], after: number[]) {
  const beforeIndexes = after.map((n, i) => n === number ? i : -1).filter(n => n >= 0);
  return before.filter((_, i) => beforeIndexes.includes(i));
}
```

J'avoue que je suis en TypeScript, mais je me préoccupe que très peu des types pour l'instant.

Désormais, pour savoir si un nombre est à la bonne place :

- je récupère son index
- je vais chercher les nombres qui doivent être devant lui
- je vérifie que chaque nombre qui doit être devant lui a bien un index inférieur

Voilà, pour la première partie.

Passons à la seconde partie, il faut remettre en ordre les lignes de mise à jour pas valide.
Il faut donc faire un tri.
Dans mon cas, si je récupère pour A et pour B les nombres qui doivent être devant chacun, je peux facilement dire :

- si la liste de A contient B, alors B doit être avant A
- si la liste de B contient A, alors A doit être avant B

J'écris enfin un test pour une fonction, pour vérifier au moins le premier cas qu'il donne.
J'ai deux lignes à modifier de la partie 1, inverser la condition pour prendre les lignes qui ne sont pas valides,
et rajouter le map qui réordonne les mises à jour.

Fini.

Je suis content, d'avoir pris des notes aujourd'hui
bien que j'ai l'impression de décrire le code que je veux faire et pas réellement ma pensée.
