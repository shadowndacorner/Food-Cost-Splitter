# Food Cost Splitter

A simple utility I wrote so that I could more easily split the cost of food deliveries with my friends.

It supports saving/loading of orders to local storage, which is handy.  Maybe I'll eventually set up a PDF receipt export or something.

## How it works

It works by dividing each individual order cost by the sum of all individual orders and multiplying each result by the delivery cost.  For example, if Ian paid $10, John paid $20, Kim paid $15, and the total cost of delivery was $60, the calculation would be:

```
totalCost = 10 + 20 + 15 = 45
deliveryCost = 60
ianTotal = 10 / 45 * 60 = $13.33
johnTotal = 20 / 45 * 60 = $26.67
kimTotal = 15 / 45 * 60 = $20
```

The goal is to split costs fairly based on the total order while factoring in delivery fees, service fees, tips, etc.  This system is the best I've thought of to do that.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
